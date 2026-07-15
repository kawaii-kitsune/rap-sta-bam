import type { Product, SpotifyRelease, SpotifyTrack } from "@/types/content";

export const products: Product[] = [
  {
    slug: "phone-memo-97-album",
    title: "97 Album",
    artist: "Phone Memo",
    platform: "ElasticStage",
    url: "https://elasticstage.com/soundcloud/releases/phone-memo-97-album",
    image: "/assets/products/97-album.jpg",
    format: "Physical / on-demand release",
    description: "A dedicated product release page for Phone Memo's 97 Album through ElasticStage.",
    featured: true
  },
  {
    slug: "two-sides-of-a-coin",
    title: "Two Sides of a Coin",
    artist: "Phone Memo",
    platform: "Bandcamp",
    url: "https://deectivamusic.bandcamp.com/album/phone-memo-two-sides-of-a-coin",
    image: "/assets/products/two-sides-of-a-coin.png",
    format: "Digital album",
    description: "A Deectiva Music Bandcamp release from Phone Memo, linked as an external album product."
  },
  {
    slug: "beats-from-scratch",
    title: "Beats From Scratch",
    artist: "Phone Memo",
    platform: "Bandcamp",
    url: "https://phonememo.bandcamp.com/album/beats-from-scratch",
    image: "/assets/products/beats-from-scratch.jpg",
    releaseDate: "Aug 2024",
    format: "Digital album",
    description: "A Phone Memo beat release hosted on Bandcamp."
  },
  {
    slug: "the-anartist-vol-2",
    title: "The Anartist vol.2",
    artist: "Phone Memo",
    platform: "Bandcamp",
    url: "https://phonememo.bandcamp.com/album/the-anartist-vol-2",
    image: "/assets/products/the-anartist-vol-2.jpg",
    releaseDate: "Dec 2020",
    format: "Digital album",
    description: "A Phone Memo Bandcamp release from the Anartist series."
  },
  {
    slug: "mosek-phone-memo-analog",
    title: "Mosek & Phone Memo - Analog",
    artist: "Mosek and Phone Memo",
    platform: "Bandcamp",
    url: "https://phonememo.bandcamp.com/album/mosek-phone-memo-analog",
    image: "/assets/products/analog.png",
    releaseDate: "Dec 2020",
    format: "Digital album",
    description: "A collaborative instrumental release by Mosek and Phone Memo, available on Bandcamp."
  }
];

export const spotifyArtist = {
  name: "Phone Memo",
  url: "https://open.spotify.com/artist/2KroWFsi3xsAX5snSQyXqc",
  monthlyListeners: "66",
  followers: "145"
};

export const spotifyReleases: SpotifyRelease[] = [
  {
    title: "Forgotten In Time",
    kind: "Album",
    year: "2022",
    url: "https://open.spotify.com/album/6tpw0OAlkWAJAir9bXtDdN",
    image: "/assets/products/forgotten-in-time.png"
  },
  {
    title: "Two Sides Of A Coin",
    kind: "Album",
    year: "2021",
    url: "https://open.spotify.com/album/1AkGwy3nrkVToejAPn7DT1",
    image: "/assets/products/two-sides-of-a-coin.png"
  },
  {
    title: "Hermanos",
    kind: "Single",
    year: "2025",
    url: "https://open.spotify.com/album/6KwLFoVfnG0VNKCcs7lIqW",
    image: "/assets/products/hermanos.png"
  },
  {
    title: "Reboot",
    kind: "EP",
    year: "2025",
    url: "https://open.spotify.com/album/7hjpVT0dH1PhvbvOUlPLmV",
    image: "/assets/products/reboot.png"
  },
  {
    title: "Analog",
    kind: "EP",
    year: "2020",
    url: "https://open.spotify.com/album/4iVyTtxNBpqgpKGeEQpQRz",
    image: "/assets/products/analog.png"
  }
];

export const spotifyTopTracks: SpotifyTrack[] = [
  {
    title: "SDE",
    album: "Reboot",
    plays: "3,367",
    url: "https://open.spotify.com/track/0yjeTrTpMJiZpfrySBVUVU"
  },
  {
    title: "Stin teliki mono to simera metraei",
    album: "Reboot",
    plays: "1,298",
    url: "https://open.spotify.com/track/4Xj0kjaK1SG2hys4IWKB5E"
  },
  {
    title: "Timberland",
    album: "Reboot",
    plays: "1,504",
    url: "https://open.spotify.com/track/1tpZRuG9kbk7DlYHRWlIuA"
  },
  {
    title: "Asfalis",
    album: "Reboot",
    plays: "under 1,000",
    url: "https://open.spotify.com/track/7tGTndC7oZtiWZTyKPlFg6"
  },
  {
    title: "Stinson Freestyle",
    album: "Reboot",
    plays: "under 1,000",
    url: "https://open.spotify.com/track/5xAPpxjADWyfw6X1ku1UZI"
  }
];

export function getFeaturedProduct() {
  return products.find((product) => product.featured) ?? products[0];
}
