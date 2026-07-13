import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getEpisodeBySlug, isReleased } from "@/lib/content";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode?.audio || !isReleased(episode.audio.availableAt ?? episode.publishedAt)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const audioRoot = path.join(process.cwd(), "private", "audio");
  const audioPath = path.join(audioRoot, path.basename(episode.audio.file));

  if (!audioPath.startsWith(audioRoot)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const fileStat = await stat(audioPath);
    const range = request.headers.get("range");
    const contentType = episode.audio.mimeType ?? "audio/mpeg";

    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);

      if (!match) {
        return new NextResponse("Invalid range", { status: 416 });
      }

      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), fileStat.size - 1) : fileStat.size - 1;

      if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= fileStat.size) {
        return new NextResponse("Range not satisfiable", {
          status: 416,
          headers: { "Content-Range": `bytes */${fileStat.size}` }
        });
      }

      const buffer = await readFile(audioPath);
      const chunk = buffer.subarray(start, end + 1);

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(chunk.byteLength),
          "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Disposition": `inline; filename="${episode.slug}.mp3"`,
          "Cache-Control": "public, max-age=3600, must-revalidate"
        }
      });
    }

    const buffer = await readFile(audioPath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buffer.byteLength),
        "Accept-Ranges": "bytes",
        "Content-Disposition": `inline; filename="${episode.slug}.mp3"`,
        "Cache-Control": "public, max-age=3600, must-revalidate"
      }
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
