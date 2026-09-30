"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { getDictionary } from "@/config/i18n";

export function ShareLinks({
  title,
  locale = "el"
}: {
  title: string;
  locale?: string;
}) {
  const [copied, setCopied] = useState(false);
  const dict = getDictionary(locale);

  async function handleCopy() {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  }

  function handleShare(platform: "twitter" | "facebook" | "whatsapp") {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=450");
    }
  }

  return (
    <div className="share-links-container flex flex-wrap items-center gap-2 pt-2">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--dim)]">
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
        {dict.common.shareEpisode}:
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="rsb-button-secondary !min-h-8 !px-2.5 !py-1 !text-xs"
        aria-label={dict.common.copyLink}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
            <span className="text-[var(--accent)]">{dict.common.linkCopied}</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{dict.common.copyLink}</span>
          </>
        )}
      </button>
      <button
        type="button"
        onClick={() => handleShare("whatsapp")}
        className="rsb-button-secondary !min-h-8 !px-2.5 !py-1 !text-xs"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </button>
      <button
        type="button"
        onClick={() => handleShare("twitter")}
        className="rsb-button-secondary !min-h-8 !px-2.5 !py-1 !text-xs"
        aria-label="Share on X"
      >
        X (Twitter)
      </button>
      <button
        type="button"
        onClick={() => handleShare("facebook")}
        className="rsb-button-secondary !min-h-8 !px-2.5 !py-1 !text-xs"
        aria-label="Share on Facebook"
      >
        Facebook
      </button>
    </div>
  );
}
