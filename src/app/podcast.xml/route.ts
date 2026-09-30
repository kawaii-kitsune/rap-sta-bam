import { NextResponse } from "next/server";
import { getVisibleEpisodes, isEpisodeLive } from "@/lib/content";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const episodes = getVisibleEpisodes();
  const publishedWithAudio = episodes.filter((ep) => isEpisodeLive(ep) && ep.audio);

  const baseUrl = siteConfig.baseUrl;

  const rssItems = publishedWithAudio
    .map((episode) => {
      const audioUrl = `${baseUrl}/episodes/${episode.slug}/audio`;
      const enclosure = `<enclosure url="${audioUrl}" length="10000000" type="${episode.audio?.mimeType ?? "audio/mpeg"}" />`;
      const pubDate = new Date(episode.publishedAt).toUTCString();

      return `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <link>${baseUrl}/el/episodes/${episode.slug}</link>
      <guid isPermaLink="false">${episode.slug}</guid>
      <description><![CDATA[${episode.description.join("\n\n")}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${enclosure}
      <itunes:image href="${baseUrl}${episode.thumbnail}" />
      <itunes:episode>${episode.number}</itunes:episode>
      <itunes:author><![CDATA[Rap Sta Bam / ${episode.artistName}]]></itunes:author>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name}]]></title>
    <description><![CDATA[${siteConfig.description}]]></description>
    <link>${baseUrl}</link>
    <language>el</language>
    <atom:link href="${baseUrl}/podcast.xml" rel="self" type="application/rss+xml" />
    <itunes:image href="${baseUrl}${siteConfig.defaultOgImage}" />
    <itunes:author>Rap Sta Bam</itunes:author>
    <itunes:owner>
      <itunes:name>Rap Sta Bam</itunes:name>
      <itunes:email>${siteConfig.contactEmail}</itunes:email>
    </itunes:owner>
    <itunes:category text="Music" />
    <itunes:category text="Arts">
      <itunes:category text="Performing Arts" />
    </itunes:category>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
