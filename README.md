# Santhosh & Preethi — Wedding Invitation (React + Supabase)

Responsive (mobile + desktop) wedding invitation built with Vite, React and Tailwind CSS.
Guest wishes / RSVPs are stored in Supabase and appear live for everyone.

## 1. Set up Supabase
1. Create a project at https://supabase.com
2. Open **SQL Editor** and run `supabase/schema.sql` (creates the `wishes` table, RLS policies and realtime).
3. Go to **Project Settings → API** and copy the Project URL and the `anon` public key.

## 2. Run locally
```bash
npm install
cp .env.example .env     # then paste your Supabase URL + anon key
npm run dev
```
Without a `.env`, the app still runs in preview mode (wishes are not saved).

## 3. Deploy
```bash
npm run build            # outputs ./dist
```
Deploy `dist` to Netlify / Vercel / Cloudflare Pages and add the two `VITE_SUPABASE_*` variables in the host's environment settings.

## Customising
- Names, dates, venues, map links, photos: `src/lib/config.js`
- Colours and fonts: `tailwind.config.js`
- Hide an inappropriate wish: set `approved = false` on that row in the Supabase Table Editor.
- Read all wishes: Table Editor → `wishes` (export as CSV any time).

## Security notes
The anon key is meant to be public. Row Level Security allows guests only to **read approved wishes** and **insert** new ones — no edits or deletes. The form also has length limits, a hidden honeypot field and a 15-second client cooldown.
- Song: change `SONG_YOUTUBE_ID` in `src/lib/config.js`. It plays through a hidden YouTube player when a guest taps the music button (browsers block autoplay).
