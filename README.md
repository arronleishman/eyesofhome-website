# Eyes of Home — official website

Next.js site for [eyesofhome.com](https://eyesofhome.com). Gigs sync from StageRise; merch, booking, and Spotify are wired for a single-page band site.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Vercel Analytics + first-party `/admin` dashboard
- StageRise public API: `https://www.stageriseapp.com/api/public/band/eyes-of-home`

## Local development

```bash
cp .env.example .env.local
# set ADMIN_PASSWORD in .env.local
npm install
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin  

## Photos

Drop curated images in `public/photos/`. Hero currently uses `press-01.jpg`; footer uses `band-01.jpg`. Prefer black-and-white live shots for the minimal look (CSS grayscale is applied).

## Deploy (Vercel)

1. Push this repo to GitHub and import in Vercel.
2. Set env var `ADMIN_PASSWORD` (and optional `ADMIN_SECRET`) in the Vercel project.
3. Enable Web Analytics in the Vercel project settings.
4. Point `eyesofhome.com` DNS to Vercel when ready to cut over.

### Analytics note

`/admin` tracks page views, merch/Spotify/booking clicks, and per-gig ticket clicks. Locally these persist in `data/analytics.json`. On Vercel the store is ephemeral per instance unless you add durable storage later (e.g. Vercel KV).

## StageRise

Edit gigs only in StageRise. Confirmed public gigs appear here automatically (revalidate ~60s).
