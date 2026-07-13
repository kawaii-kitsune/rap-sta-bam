# Ραπ Στα Μπαμ

Production-ready Next.js website for the Greek independent music video series **Ραπ Στα Μπαμ**, based in Heraklion, Crete.

## Technology stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Server Components by default
- Client Components only for the mobile menu, archive filter and participation form
- Lucide React icons
- `next/image` for local media
- Static local content files, no database

## Local installation

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

## Development commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## How to edit episodes

Edit `src/content/episodes.json`. The TypeScript wrapper reads this JSON and the shape follows the `Episode` type in `src/types/content.ts`.

Use `status: "published"`, `status: "upcoming"` or `status: "draft"` to mark archive state. Optional fields such as `youtubeVideoId`, `shortClips`, `gallery`, `gear` and external URLs can be omitted safely.

## How to edit artists

Edit `src/content/artists.json`. The TypeScript wrapper reads this JSON and the shape follows the `Artist` type in `src/types/content.ts`.

Artist pages and cards are generated from the slug. Related episodes are found automatically by matching `artistSlug`.

## How to configure Formspree

Create a `.env.local` file:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

Restart the dev server after changing env vars. Do not place secret keys in public env vars.

If the endpoint is empty, the participation form shows a development fallback and generates a `mailto:` link instead of pretending to submit.

## How to replace placeholder images

Local assets live in `public/assets`.

- Episode thumbnails: `public/assets/episodes`
- Artist images: `public/assets/artists`
- Gallery images: `public/assets/gallery`

Replace the SVG placeholders with optimized `.jpg`, `.png`, `.webp` or `.svg` files and update paths in the content files.

## How to add YouTube embeds

Add a valid `youtubeVideoId` to an episode in `src/content/episodes.ts`.

Example:

```ts
youtubeVideoId: "abc123"
```

The site uses `youtube-nocookie.com` embeds and does not autoplay media. If no video ID exists, a safe placeholder message is rendered.

## How to deploy on Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel Project Settings if form delivery is required.
5. Deploy.

The app is static-content based and compatible with Vercel’s free tier.

## How to connect a custom domain later

In Vercel, open Project Settings, go to Domains, add the domain, then follow the DNS instructions Vercel provides. After the domain is active, update `siteConfig.baseUrl` in `src/config/site.ts`.

## Environment variables

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=
```

Only this public endpoint is currently used.

## Project structure

```text
src/
  app/          App Router routes, metadata, sitemap and robots
  components/   Shared UI components
  config/       Central site metadata and social links
  content/      Editable JSON content plus typed wrappers
  lib/          Content helpers and metadata helpers
  types/        Shared TypeScript types
public/
  assets/       Local placeholder images
```
