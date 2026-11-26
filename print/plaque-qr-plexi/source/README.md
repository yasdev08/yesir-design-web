# Regenerate the plate

Requirements: Python 3 with `segno uharfbuzz fonttools brotli`, Node with Playwright.

1. Download the fonts (Inter Tight 500/700 as static instances, Michroma, JetBrains Mono 500,
   IBM Plex Sans Arabic 500) as TTF into a `fonts/` folder (file names as in `plexi.py`).
2. `python3 plexi.py fonts ..` — writes the SVG layers and the standalone QR.
3. `SP=/tmp node mockup.js ..` — renders the two mockups.
4. `node pdf.js ..` — builds the print PDFs (color, white, cut).

Edit `URL`, the texts and sizes at the top of `build()` in `plexi.py`.
