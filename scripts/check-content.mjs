import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const validStatuses = new Set(["published", "upcoming", "draft"]);
const today = new Date();
today.setHours(0, 0, 0, 0);

const errors = [];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    return [];
  }
}

function requireString(scope, object, key) {
  if (typeof object[key] !== "string" || !object[key].trim()) {
    errors.push(`${scope}: missing ${key}`);
  }
}

function requireArray(scope, object, key) {
  if (!Array.isArray(object[key]) || object[key].length === 0) {
    errors.push(`${scope}: ${key} must be a non-empty array`);
  }
}

function parseDate(scope, value, key) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    errors.push(`${scope}: ${key} must use YYYY-MM-DD`);
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    errors.push(`${scope}: ${key} is not a valid date`);
    return null;
  }

  return date;
}

function requireUnique(collection, key, label) {
  const seen = new Set();
  for (const item of collection) {
    if (!item?.[key]) continue;
    if (seen.has(item[key])) {
      errors.push(`${label}: duplicate ${key} "${item[key]}"`);
    }
    seen.add(item[key]);
  }
}

function checkPublicAsset(scope, value) {
  if (typeof value !== "string" || !value.startsWith("/")) {
    errors.push(`${scope}: asset path must start with /`);
    return;
  }

  const file = path.join(root, "public", value);
  if (!fs.existsSync(file)) {
    errors.push(`${scope}: missing asset ${value}`);
  }
}

function checkHttpUrl(scope, value) {
  if (!value) return;

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      errors.push(`${scope}: URL must be http(s)`);
    }
  } catch {
    errors.push(`${scope}: invalid URL ${value}`);
  }
}

function validateDataset(episodesFile, artistsFile, teamFile) {
  const episodes = readJson(episodesFile);
  const artists = readJson(artistsFile);
  const team = readJson(teamFile);

  console.log(`ok json ${episodesFile}`);
  console.log(`ok json ${artistsFile}`);
  console.log(`ok json ${teamFile}`);

  if (!Array.isArray(episodes)) errors.push(`${episodesFile}: root must be an array`);
  if (!Array.isArray(artists)) errors.push(`${artistsFile}: root must be an array`);
  if (!Array.isArray(team)) errors.push(`${teamFile}: root must be an array`);

  requireUnique(episodes, "slug", episodesFile);
  requireUnique(episodes, "number", episodesFile);
  requireUnique(artists, "slug", artistsFile);

  const artistSlugs = new Set(artists.map((artist) => artist.slug));

  for (const artist of artists) {
    const scope = `${artistsFile} artist ${artist.slug ?? "(missing slug)"}`;
    requireString(scope, artist, "slug");
    requireString(scope, artist, "name");
    requireString(scope, artist, "image");
    requireString(scope, artist, "shortBio");
    requireArray(scope, artist, "bio");
    if (artist.image) checkPublicAsset(`${scope}.image`, artist.image);
    ["instagramUrl", "tiktokUrl", "spotifyUrl", "youtubeUrl"].forEach((key) => checkHttpUrl(`${scope}.${key}`, artist[key]));
  }

  for (const episode of episodes) {
    const scope = `${episodesFile} episode ${episode.slug ?? "(missing slug)"}`;
    requireString(scope, episode, "slug");
    requireString(scope, episode, "title");
    requireString(scope, episode, "artistSlug");
    requireString(scope, episode, "artistName");
    requireString(scope, episode, "excerpt");
    requireString(scope, episode, "thumbnail");
    requireArray(scope, episode, "description");

    if (!Number.isInteger(episode.number) || episode.number < 1) {
      errors.push(`${scope}: number must be a positive integer`);
    }

    if (!artistSlugs.has(episode.artistSlug)) {
      errors.push(`${scope}: artistSlug "${episode.artistSlug}" does not exist in ${artistsFile}`);
    }

    const status = episode.status ?? "published";
    if (!validStatuses.has(status)) {
      errors.push(`${scope}: invalid status "${status}"`);
    }

    const publishedAt = parseDate(scope, episode.publishedAt, "publishedAt");
    if (status === "published" && publishedAt && publishedAt > today) {
      errors.push(`${scope}: published episodes cannot have a future publishedAt date`);
    }

    if (episode.thumbnail) checkPublicAsset(`${scope}.thumbnail`, episode.thumbnail);
    episode.gallery?.forEach((image, index) => checkPublicAsset(`${scope}.gallery[${index}]`, image));
    episode.bestMoments?.forEach((moment, index) => {
      requireString(`${scope}.bestMoments[${index}]`, moment, "title");
      requireString(`${scope}.bestMoments[${index}]`, moment, "copy");
      requireString(`${scope}.bestMoments[${index}]`, moment, "image");
      if (moment.image) checkPublicAsset(`${scope}.bestMoments[${index}].image`, moment.image);
    });
    episode.sessionFacts?.forEach((fact, index) => {
      requireString(`${scope}.sessionFacts[${index}]`, fact, "label");
      requireString(`${scope}.sessionFacts[${index}]`, fact, "value");
    });

    if (episode.audio) {
      requireString(`${scope}.audio`, episode.audio, "file");
      const audioDate = parseDate(`${scope}.audio`, episode.audio.availableAt, "availableAt");
      const audioFile = path.resolve(root, episode.audio.file ?? "");

      if (!audioFile.startsWith(root) || !fs.existsSync(audioFile)) {
        errors.push(`${scope}.audio: missing file ${episode.audio.file}`);
      }

      if (publishedAt && audioDate && audioDate < publishedAt && episode.audio.previewUnlock !== true) {
        errors.push(`${scope}.audio: availableAt cannot be earlier than publishedAt unless previewUnlock is true`);
      }

      if (episode.audio.captions) {
        checkPublicAsset(`${scope}.audio.captions`, episode.audio.captions);
      }
    }

    ["youtubeUrl", "instagramUrl", "tiktokUrl", "spotifyUrl"].forEach((key) => checkHttpUrl(`${scope}.${key}`, episode[key]));
    episode.shortClips?.forEach((clip, index) => checkHttpUrl(`${scope}.shortClips[${index}]`, clip.url));
    episode.instagramEmbeds?.forEach((embed, index) => checkHttpUrl(`${scope}.instagramEmbeds[${index}]`, embed.url));
  }

  for (const member of team) {
    const scope = `${teamFile} team member ${member.name ?? "(missing name)"}`;
    requireString(scope, member, "name");
    requireString(scope, member, "role");
    checkHttpUrl(`${scope}.url`, member.url);
  }
}

validateDataset("src/content/episodes.json", "src/content/artists.json", "src/content/team.json");
validateDataset("src/content/episodes.en.json", "src/content/artists.en.json", "src/content/team.en.json");

if (errors.length) {
  console.error("\nContent check failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("content validation ok");
