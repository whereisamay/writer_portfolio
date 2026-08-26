# Amay Prabhu — Writer Portfolio

A single-page, no-build-step portfolio site (plain HTML/CSS/JS).

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

No build tools, no dependencies — any static file server works.

## Add your photos

The layout is already wired up for three images. Drop files with these
**exact names** into `assets/images/` and they'll appear automatically
(no code changes needed) — until then, each spot shows a styled placeholder:

| File | Used in |
|---|---|
| `assets/images/headshot.png` | Hero section (right side) — mustard-blob frame |
| `assets/images/pm-illustration.png` | "Spec to scribble" section — sits on a white card, `object-fit: contain` (use a PNG/SVG with a transparent or white background, not a cropped photo) |
| `assets/images/balance-illustration.jpg` | "The dream" section — 16:9 card, `object-fit: contain`, blue-tinted panel (use a landscape illustration, not a cropped photo) |

## Add your content

Search the page for `[bracketed placeholder text]` — these are the spots
still waiting on your copy:

- Hero subtext
- Backstory paragraphs (both story sections)
- "Selected work" intro line
- Work carousel cards — title, description, and the `href="#"` link on
  each card's "Read it →"
- Footer email (`hello@example.com` — replace with your real address,
  in both the `href="mailto:..."` and the visible text)

To add or remove work cards, copy/paste a `<article class="work-card">...</article>`
block inside `#carouselTrack` in `index.html` — the carousel JS picks up
however many cards are there automatically.

## Already wired up

- LinkedIn: https://www.linkedin.com/in/amay-prabhu-52b70a135/
- Instagram: https://www.instagram.com/whereisamay/

(in the header, and again in the footer)

## Deploy

It's static files, so any of these work as-is:
- GitHub Pages (Settings → Pages → deploy from this branch/root)
- Netlify / Vercel (drag-and-drop the folder, or connect the repo)
