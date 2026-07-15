export type SocialPlatform = "youtube" | "tiktok" | "instagram" | "spotify" | "website";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type EpisodeStatus = "published" | "upcoming" | "draft";

export type Episode = {
  slug: string;
  number: number;
  title: string;
  artistSlug: string;
  artistName: string;
  excerpt: string;
  description: string[];
  publishedAt: string;
  thumbnail: string;
  status?: EpisodeStatus;
  audio?: {
    file: string;
    availableAt: string;
    label?: string;
    mimeType?: string;
    captions?: string;
    previewUnlock?: boolean;
  };
  youtubeVideoId?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  shortClips?: {
    title: string;
    url: string;
  }[];
  instagramEmbeds?: {
    title: string;
    url: string;
  }[];
  gallery?: string[];
  sessionFacts?: {
    label: string;
    value: string;
    note?: string;
  }[];
  bestMoments?: {
    title: string;
    copy: string;
    image: string;
  }[];
  gear?: string[];
  credits: {
    role: string;
    name: string;
    url?: string;
    artistSlug?: string;
    note?: string;
  }[];
  featured?: boolean;
};

export type ArtistKind = "guest" | "team";

export type Artist = {
  slug: string;
  name: string;
  kind?: ArtistKind;
  image: string;
  location?: string;
  shortBio: string;
  bio: string[];
  instagramUrl?: string;
  tiktokUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  featured?: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  url?: string;
};

export type ProductPlatform = "ElasticStage" | "Bandcamp";

export type Product = {
  slug: string;
  title: string;
  artist: string;
  platform: ProductPlatform;
  url: string;
  image?: string;
  releaseDate?: string;
  format: string;
  description: string;
  featured?: boolean;
};

export type SpotifyReleaseKind = "Album" | "EP" | "Single";

export type SpotifyRelease = {
  title: string;
  kind: SpotifyReleaseKind;
  year: string;
  url: string;
  image?: string;
};

export type SpotifyTrack = {
  title: string;
  album: string;
  plays: string;
  url: string;
};
