# Amay Prabhu — Writer Portfolio

A single-page, no-build-step portfolio site (plain HTML/CSS/JS).

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

No build tools, no dependencies — any static file server works.

## Add your photos

Drop files with these **exact names** into `assets/images/` and they'll
appear automatically (no code changes needed) — until then, each spot shows
a styled placeholder:

| File | Used in |
|---|---|
| `assets/images/headshot.png` | Hero section (right side) — mustard-blob frame |
| `assets/images/pm-illustration.png` | "The backstory" section — sits on a white card, `object-fit: contain` (use a PNG/SVG with a transparent or white background, not a cropped photo) |
| `assets/images/ga1.jpg` … `ga8.jpg` | The 8 slides of the Goa photo carousel in `articles/two-dots-on-the-map.html`, in order (ga1 = "A lazy day sipping & binging at Majorda" … ga8 = "A colourful flight of stairs in Fontainhas") |
| `assets/images/coonoor.png` | The Coonoor section in the same article |
| `assets/images/card-tote-bag.png` | "Selected work" — Essay card thumbnail |
| `assets/images/card-backpack.jpg` | "Selected work" — Travel card thumbnail |
| `assets/images/woos.jpg` | "Selected work" — How-to card thumbnail |

## Add your content

To add or remove work cards, copy/paste an `<article class="work-card">...</article>`
block inside `.work-grid` in `index.html` — it's a plain CSS grid (3 columns
on desktop, stepping down to 2 then 1 on smaller screens), so any number of
cards works.

To add another place to the travel piece, copy a `<section class="place-section">`
block in `articles/two-dots-on-the-map.html`. For a photo carousel like Goa's,
copy the `.photo-carousel` block and add/remove `.photo-carousel-slide`
figures — the carousel JS in `assets/js/main.js` picks up any number of
slides automatically. For a single photo like Coonoor's, just reuse a
`.media-frame` block instead.

## Already wired up

- LinkedIn: https://www.linkedin.com/in/amay-prabhu-52b70a135/
- Instagram: https://www.instagram.com/whereisamay/

(in the header, and again in the footer)

## Deploy

It's static files, so any of these work as-is:
- GitHub Pages (Settings → Pages → deploy from this branch/root)
- Netlify / Vercel (drag-and-drop the folder, or connect the repo)
