import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    slug: "phone-memo-97-album",
    title: "97 Album",
    artist: "Phone Memo",
    platform: "ElasticStage",
    url: "https://elasticstage.com/soundcloud/releases/phone-memo-97-album",
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
    format: "Digital album",
    description: "A Deectiva Music Bandcamp release from Phone Memo, linked as an external album product."
  },
  {
    slug: "beats-from-scratch",
    title: "Beats From Scratch",
    artist: "Phone Memo",
    platform: "Bandcamp",
    url: "https://phonememo.bandcamp.com/album/beats-from-scratch",
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
    releaseDate: "Dec 2020",
    format: "Digital album",
    description: "A collaborative instrumental release by Mosek and Phone Memo, available on Bandcamp."
  }
];

export function getFeaturedProduct() {
  return products.find((product) => product.featured) ?? products[0];
}
