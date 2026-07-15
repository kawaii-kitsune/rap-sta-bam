# Content Control

Edit these files to control the site content:

- `episodes.json` controls `/`, `/episodes` and `/episodes/[slug]`.
- `artists.json` controls `/artists` and `/artists/[slug]`.
- `team.json` controls the team / credits area on `/about`.

You can edit these files from GitHub's web editor after the project is pushed to a repository. When you commit a change, Vercel will rebuild the site.

## Episode checklist

For a new episode:

1. Add images to `public/assets/episodes/` or `public/assets/real/`.
2. Add an object to `episodes.json`.
3. Use a unique `slug`, for example `002-artist-name`.
4. Set `artistSlug` to match an artist in `artists.json`.
5. Add `youtubeVideoId` only when the YouTube video is public or ready.
6. Use `status` as `published`, `upcoming` or `draft`.

## Artist checklist

For a new artist:

1. Add an image to `public/assets/artists/`.
2. Add an object to `artists.json`.
3. Use a unique `slug`.
4. Use that same slug in episode `artistSlug`.


## Product / release checklist

For a new product or release:

1. Edit `products.ts`.
2. Add buy/support links to `products` for Bandcamp or ElasticStage pages.
3. Add Spotify albums, EPs or singles to `spotifyReleases`.
4. Add visible Spotify popular tracks to `spotifyTopTracks` only when you want them shown on `/products`.
5. Use `under 1,000` when Spotify hides the exact play count.
6. Update the source-date note on `/products` when you refresh Spotify data.

## Image paths

All public files are referenced from the site root:

```json
"thumbnail": "/assets/episodes/episode-002.jpg"
```

Do not include `/public` in the path.

## Important

JSON is strict:

- Use double quotes.
- No trailing commas.
- Keep arrays and objects closed.
- Run `npm run build` before deploying manually.
