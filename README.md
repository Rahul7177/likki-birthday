# For Likhita ♡

A private-feeling, mobile-first birthday website and cinematic photo film for Likhita's October 28 birthday. Built with React, Vite, Framer Motion, and custom CSS.

## Run locally
1. Install Node.js 20+.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.
4. Run `npm run build` to create the production site in `dist/`.

## Deploy
Deploy the `dist/` folder to any static host (Netlify, Vercel, or GitHub Pages with the correct base path). **Important:** a hard-to-guess URL is not real access control. If you want the photos private, enable host-level password protection or authentication before sharing.

## Contents
- `public/photos/` — the photos shared in this conversation.
- `birthday_film.mp4` — cinematic slideshow film (generated separately and included in the project ZIP).
- `narration.txt` — approved narration, kept verbatim.

## Notes
- The site starts with an envelope-style opening screen.
- Photos open in a larger lightbox; chapters expand on tap; the letter can be saved using the browser print-to-PDF flow; the candle is interactive.
- Audio is not forced on visitors. The included video uses a quiet synthesized instrumental bed; it does not contain a voice recording. A real voiceover can be added later if desired.
- You can add future photos by placing them in `public/photos/` and adding an entry in `photos` inside `src/main.jsx`.
