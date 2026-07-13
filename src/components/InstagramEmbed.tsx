"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

export function InstagramEmbed({ url, captioned = true }: { url: string; captioned?: boolean }) {
  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, [url]);

  return (
    <div className="flex justify-center border border-[var(--line)] bg-[var(--panel)] p-3 sm:p-5">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned={captioned ? "" : undefined}
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: 1,
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: "calc(100% - 2px)"
        }}
      >
        <div style={{ padding: 16 }}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#fff",
              lineHeight: 0,
              padding: 0,
              textAlign: "center",
              textDecoration: "none",
              width: "100%"
            }}
          >
            View this post on Instagram
          </a>
        </div>
      </blockquote>
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => window.instgrm?.Embeds?.process()} />
    </div>
  );
}
