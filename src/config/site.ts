import type { SocialLink } from "@/types/content";

export const siteConfig = {
  name: "Ραπ Στα Μπαμ",
  shortName: "ΡΣΜ",
  description:
    "Ανεξάρτητη DIY μουσική σειρά από το Ηράκλειο Κρήτης όπου rappers αφηγούνται την ιστορία τους και χτίζουν beat, κουπλέ και recording σε ένα session.",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rap-sta-bam.vercel.app").replace(/\/$/, ""),
  defaultOgImage: "/assets/logo/logo-black-red.png",
  location: "Ηράκλειο Κρήτης",
  owner: "Phone Memo",
  contactEmail: "straightjacker01@gmail.com",
  googleContactForm: {
    viewUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd6RH3wrJZWgAjx0exMyOYN7_qpCnKKfHAGiTEpjJ9YP3hasw/viewform?usp=publish-editor",
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd6RH3wrJZWgAjx0exMyOYN7_qpCnKKfHAGiTEpjJ9YP3hasw/formResponse",
    fields: {
      email: "emailAddress",
      name: "entry.851724991",
      topic: "entry.860859353",
      message: "entry.1183695994"
    }
  },
  socials: {
    youtube: "https://www.youtube.com/@phonememo_the.anartist",
    tiktok: "https://www.tiktok.com/@phonememo",
    instagram: "https://www.instagram.com/phone_memo_the.anartist/",
    spotify: "https://open.spotify.com/artist/2KroWFsi3xsAX5snSQyXqc",
    dov1nosTikTok: "https://www.tiktok.com/@dov1nos",
    dimitrisTsekerisTikTok: "https://www.tiktok.com/@dimitris.tsekeris2",
    leSnipeInstagram: "https://www.instagram.com/lesnipe.vfx",
    leSnipeTikTok: "https://www.tiktok.com/@lesnipe_vfx",
    leSnipeWebsite: "https://www.lesnipevfx.com/"
  }
} as const;

export const releaseSchedule = [
  { date: "2026-07-21", label: "21/07", title: "Session #001 — Τζίμος" },
  { date: "2026-08-18", label: "18/08", title: "Session #002 — TBA" },
  { date: "2026-09-15", label: "15/09", title: "Session #003 — TBA" },
  { date: "2026-10-20", label: "20/10", title: "Session #004 — TBA" },
  { date: "2026-11-10", label: "10/11", title: "Session #005 — TBA" },
  { date: "2026-12-15", label: "15/12", title: "Session #006 — TBA" }
] as const;

export const releaseCadence = "Ένα νέο session κάθε μήνα";

export const projectSocialLinks: SocialLink[] = [
  { platform: "youtube", label: "YouTube", url: siteConfig.socials.youtube },
  { platform: "tiktok", label: "TikTok", url: siteConfig.socials.tiktok },
  { platform: "instagram", label: "Instagram", url: siteConfig.socials.instagram },
  { platform: "spotify", label: "Spotify", url: siteConfig.socials.spotify }
];
