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
    description: {
      el: "Ειδική έκδοση σε βινύλιο on-demand για το 97 Album του Phone Memo μέσω του ElasticStage.",
      en: "A dedicated on-demand physical vinyl release for Phone Memo's 97 Album through ElasticStage."
    },
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
    description: {
      el: "Κυκλοφορία του Phone Memo από την Deectiva Music στο Bandcamp, διαθέσιμη ως ψηφιακό άλμπουμ.",
      en: "A Deectiva Music Bandcamp release from Phone Memo, available as a full digital album."
    }
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
    description: {
      el: "Beat tape άλμπουμ του Phone Memo φτιαγμένο από το μηδέν, φιλοξενούμενο στο Bandcamp.",
      en: "An authentic Phone Memo beat tape crafted from scratch, hosted on Bandcamp."
    }
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
    description: {
      el: "Κυκλοφορία Bandcamp από τη σειρά The Anartist του Phone Memo.",
      en: "A classic Phone Memo Bandcamp instrumental release from the Anartist series."
    }
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
    description: {
      el: "Συνεργατικό instrumental project από τον Mosek και τον Phone Memo στο Bandcamp.",
      en: "A collaborative instrumental release by Mosek and Phone Memo, available on Bandcamp."
    }
  }
];

export const spotifyArtist = {
  name: "Phone Memo",
  url: "https://open.spotify.com/artist/2KroWFsi3xsAX5snSQyXqc",
  monthlyListeners: "184",
  followers: "210"
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
    plays: "4,120",
    url: "https://open.spotify.com/track/0yjeTrTpMJiZpfrySBVUVU"
  },
  {
    title: "Stin teliki mono to simera metraei",
    album: "Reboot",
    plays: "1,680",
    url: "https://open.spotify.com/track/4Xj0kjaK1SG2hys4IWKB5E"
  },
  {
    title: "Timberland",
    album: "Reboot",
    plays: "1,940",
    url: "https://open.spotify.com/track/1tpZRuG9kbk7DlYHRWlIuA"
  },
  {
    title: "Asfalis",
    album: "Reboot",
    plays: "1,110",
    url: "https://open.spotify.com/track/7tGTndC7oZtiWZTyKPlFg6"
  },
  {
    title: "Stinson Freestyle",
    album: "Reboot",
    plays: "1,050",
    url: "https://open.spotify.com/track/5xAPpxjADWyfw6X1ku1UZI"
  }
];

export function getFeaturedProduct() {
  return products.find((product) => product.featured) ?? products[0];
}
