"""YESIR DESIGN — transparent acrylic QR plate generator.

Outputs real-size (mm) SVG layers for UV printing on clear acrylic + laser cutting:
  composite (proof), COLOR (CMYK), WHITE (white-ink underbase / white elements), CUT (contour + holes).
All text is converted to outlines (HarfBuzz shaping + fontTools glyph paths).
"""
import os, sys, json
import segno
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONTS, OUT = sys.argv[1], sys.argv[2]
URL = "https://yesir-design-web.vercel.app/qr"
W, H = 150.0, 200.0          # plate (mm)
R_CORNER = 8.0               # plate corner radius
HOLE_D, HOLE_INSET = 8.0, 12.0
BLUE, SKY, INK, WHITE = "#2B63F0", "#6B8BFF", "#0B0B0D", "#FFFFFF"

# ---------------------------------------------------------------- fonts / text
class Face:
    def __init__(self, path):
        self.tt = TTFont(path)
        blob = hb.Blob.from_file_path(path)
        self.hbface = hb.Face(blob)
        self.upem = self.tt["head"].unitsPerEm
        self.glyphset = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()

    def shape(self, text, rtl=False):
        font = hb.Font(self.hbface)
        buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
        if rtl: buf.direction = "rtl"
        hb.shape(font, buf, {"kern": True, "liga": True})
        return buf.glyph_infos, buf.glyph_positions

def text_path(face, text, size, x, y, anchor="middle", tracking=0.0, rtl=False, target_width=None):
    """Outline `text` at font size `size` (mm). Baseline at y. Returns (path_d, width)."""
    infos, poss = face.shape(text, rtl)
    s = size / face.upem
    adv = [p.x_advance * s for p in poss]
    n = len(infos)
    if target_width and n > 1:
        tracking = (target_width - sum(adv)) / (n - 1)
    width = sum(adv) + tracking * (n - 1)
    x0 = {"start": x, "middle": x - width / 2, "end": x - width}[anchor]
    d, pen_x = [], x0
    for i, (info, pos) in enumerate(zip(infos, poss)):
        gname = face.order[info.codepoint]
        pen = SVGPathPen(face.glyphset)
        tp = TransformPen(pen, (s, 0, 0, -s, pen_x + pos.x_offset * s, y - pos.y_offset * s))
        face.glyphset[gname].draw(tp)
        d.append(pen.getCommands())
        pen_x += adv[i] + (tracking if i < n - 1 else 0)
    return " ".join(c for c in d if c), width

F = {
    "bold": Face(f"{FONTS}/InterTight-700-latin-static.ttf"),
    "medium": Face(f"{FONTS}/InterTight-500-latin-static.ttf"),
    "mono": Face(f"{FONTS}/JetBrainsMono-500-latin.ttf"),
    "wordmark": Face(f"{FONTS}/Michroma-400-latin.ttf"),
    "arabic": Face(f"{FONTS}/IBMPlexSansArabic-500-arabic.ttf"),
}

# ---------------------------------------------------------------- brand mark
MARK_W, MARK_H = 172, 181
MARK_BLUE = [(0, 0.75), (47.5, 0.75), (75.75, 44), (53.25, 79)]
MARK_WHITE = [(130.75, 0), (172, 0), (105, 100.75), (105, 123.25), (65.75, 180.75), (65.75, 96.5), (92.5, 59.5), (102.5, 70.75), (102.5, 49.5), (100.75, 46.5)]

def poly(points, s, ox, oy):
    return "M" + " L".join(f"{x * s + ox:.3f} {y * s + oy:.3f}" for x, y in points) + " Z"

def lockup(cx, top, height):
    """YESIR DESIGN lockup, proportions from the brand file. Returns dict of colored paths + bbox."""
    s = height / MARK_H                      # mm per mark unit (lockup uses same unit system as Logo.tsx)
    total_w = (758 - 38) * s                 # lockup viewBox width 720 units
    ox = cx - total_w / 2 - 38 * s           # translate so lockup is centered
    oy = top - 134 * s
    blue = poly(MARK_BLUE, s, ox + 40.5 * s, oy + 138 * s)
    mark = poly(MARK_WHITE, s, ox + 40.5 * s, oy + 138 * s)
    yesir, _ = text_path(F["wordmark"], "YESIR", 82 * s, ox + 266 * s, oy + 239 * s, "start", target_width=490 * s * 0.985)
    design, _ = text_path(F["wordmark"], "DESIGN", 34 * s, ox + 273 * s, oy + 295 * s, "start", target_width=481 * s * 0.96)
    return {"blue": [blue, design], "main": [mark, yesir], "bbox": (ox + 38 * s, top, total_w, height * 186 / 181)}

# ---------------------------------------------------------------- QR
qr = segno.make(URL, error="q", micro=False)
matrix = [list(row) for row in qr.matrix]
N = len(matrix)

def qr_paths(x, y, size):
    """Dark modules as one path; finder patterns drawn as rounded squares (still standard-compliant)."""
    m = size / N
    finders = [(0, 0), (N - 7, 0), (0, N - 7)]
    def in_finder(r, c):
        return any(fr <= r < fr + 7 and fc <= c < fc + 7 for fc, fr in finders)
    d = []
    for r in range(N):
        c = 0
        while c < N:
            if matrix[r][c] and not in_finder(r, c):
                start = c
                while c < N and matrix[r][c] and not in_finder(r, c):
                    c += 1
                # merge horizontal runs; tiny overlap avoids hairline gaps in print RIPs
                d.append(f"M{x + start * m:.3f} {y + r * m:.3f}h{(c - start) * m + 0.01:.3f}v{m + 0.01:.3f}h{-(c - start) * m - 0.01:.3f}Z")
            else:
                c += 1
    fd = []
    for fc, fr in finders:
        X, Y = x + fc * m, y + fr * m
        fd.append(rrect(X, Y, 7 * m, 7 * m, 0.7 * m) + " " + rrect(X + m, Y + m, 5 * m, 5 * m, 0.35 * m, reverse=True))
        fd.append(rrect(X + 2 * m, Y + 2 * m, 3 * m, 3 * m, 0.35 * m))
    return " ".join(d), " ".join(fd), m

def rrect(x, y, w, h, r, reverse=False):
    if not reverse:
        return (f"M{x + r:.3f} {y:.3f}H{x + w - r:.3f}A{r} {r} 0 0 1 {x + w:.3f} {y + r:.3f}V{y + h - r:.3f}"
                f"A{r} {r} 0 0 1 {x + w - r:.3f} {y + h:.3f}H{x + r:.3f}A{r} {r} 0 0 1 {x:.3f} {y + h - r:.3f}V{y + r:.3f}A{r} {r} 0 0 1 {x + r:.3f} {y:.3f}Z")
    return (f"M{x + r:.3f} {y:.3f}A{r} {r} 0 0 0 {x:.3f} {y + r:.3f}V{y + h - r:.3f}A{r} {r} 0 0 0 {x + r:.3f} {y + h:.3f}"
            f"H{x + w - r:.3f}A{r} {r} 0 0 0 {x + w:.3f} {y + h - r:.3f}V{y + r:.3f}A{r} {r} 0 0 0 {x + w - r:.3f} {y:.3f}Z")

# ---------------------------------------------------------------- layout
def build(variant):
    dark_wall = variant == "sombre"
    main_col = WHITE if dark_wall else INK
    accent = SKY if dark_wall else BLUE
    sub_col = "#C9CDD6" if dark_wall else "#3F3F46"

    el = []  # (layer, fill, d)  layer: "color" (CMYK ink) | "white" (white ink is the visible colour)

    def add(d, fill):
        el.append(("white" if fill == WHITE else "color", fill, d))

    # logo
    lk = lockup(W / 2, 15.5, 13.0)
    mark_blue, design_word = lk["blue"]
    add(mark_blue, BLUE)                                  # the mark's blue arm stays brand blue
    add(design_word, SKY if dark_wall else BLUE)          # "DESIGN" lighter on dark walls for legibility
    for d in lk["main"]: add(d, main_col)

    # eyebrow
    d, _ = text_path(F["mono"], "SITES WEB · MENUS QR · ÉCRANS TV · ENSEIGNES", 3.0, W / 2, 43.5, tracking=0.32)
    add(d, accent)
    assert _ < W - 2 * 12, "services line too wide"
    # headline
    d, _ = text_path(F["bold"], "Du pixel", 12.5, W / 2, 59.0, tracking=-0.3)
    add(d, main_col)
    d, _ = text_path(F["bold"], "à la façade.", 12.5, W / 2, 72.0, tracking=-0.3)
    add(d, accent)

    # QR tile (white ink, always — dark modules on white = reliable scan on any wall)
    tile, tx, ty = 82.0, (W - 82.0) / 2, 80.0
    tile_d = rrect(tx, ty, tile, tile, 5.0)
    quiet = 4
    qsize = tile * N / (N + 2 * quiet) * 0.995
    qx, qy = W / 2 - qsize / 2, ty + tile / 2 - qsize / 2
    mods, finders, module_mm = qr_paths(qx, qy, qsize)
    # corner brackets (brand QR frame)
    g, L, sw = 2.6, 11.0, 1.1
    bx0, by0, bx1, by1 = tx - g, ty - g, tx + tile + g, ty + tile + g
    def bracket(x, y, dx, dy):
        return (f"M{x:.3f} {y + dy * L:.3f}V{y:.3f}H{x + dx * L:.3f}")
    brackets = [bracket(bx0, by0, 1, 1), bracket(bx1, by0, -1, 1), bracket(bx0, by1, 1, -1), bracket(bx1, by1, -1, -1)]

    # call to action FR + AR
    d, _ = text_path(F["medium"], "Scannez pour découvrir l'agence", 4.6, W / 2, ty + tile + g + 9.0)
    add(d, main_col)
    d, _ = text_path(F["arabic"], "امسح الرمز لاكتشاف وكالتنا", 4.4, W / 2, ty + tile + g + 16.2, rtl=True)
    add(d, sub_col)
    # footer (between the bottom standoffs)
    d, fw = text_path(F["mono"], "WHATSAPP 0555 34 37 65  ·  @YESIRDESIGN31", 2.9, W / 2, 192.0, tracking=0.2)
    add(d, sub_col)
    assert fw < W - 2 * (HOLE_INSET + 10), f"footer too wide ({fw:.1f} mm) for standoff caps"

    return dict(el=el, tile=tile_d, mods=mods, finders=finders, brackets=brackets, sw=sw, accent=accent,
                module_mm=module_mm, qsize=qsize, tile_xy=(tx, ty, tile))

def cut_paths():
    outline = rrect(0, 0, W, H, R_CORNER)
    holes = []
    for cx in (HOLE_INSET, W - HOLE_INSET):
        for cy in (HOLE_INSET, H - HOLE_INSET):
            r = HOLE_D / 2
            holes.append(f"M{cx - r:.3f} {cy:.3f}a{r} {r} 0 1 0 {2 * r:.3f} 0a{r} {r} 0 1 0 {-2 * r:.3f} 0Z")
    return outline, holes

def svg(body, title, w=W, h=H, extra=""):
    return (f'<?xml version="1.0" encoding="UTF-8"?>\n'
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:g}mm" height="{h:g}mm" viewBox="0 0 {w:g} {h:g}" {extra}>\n'
            f"<title>{title}</title>\n{body}\n</svg>\n")

def render(variant):
    L = build(variant)
    outline, holes = cut_paths()
    color_parts, white_parts, comp = [], [], []
    for layer, fill, d in L["el"]:
        comp.append(f'<path d="{d}" fill="{fill}"/>')
        if layer == "color": color_parts.append(f'<path d="{d}" fill="{fill}"/>')
        white_parts.append(f'<path d="{d}" fill="#000"/>')      # white ink under (or as) every element
    qr_d = f'<path d="{L["mods"]}" fill="{INK}"/><path d="{L["finders"]}" fill="{INK}" fill-rule="evenodd"/>'
    br = "".join(f'<path d="{b}" fill="none" stroke="{L["accent"]}" stroke-width="{L["sw"]}" stroke-linecap="round" stroke-linejoin="round"/>' for b in L["brackets"])
    br_white = "".join(f'<path d="{b}" fill="none" stroke="#000" stroke-width="{L["sw"]}" stroke-linecap="round" stroke-linejoin="round"/>' for b in L["brackets"])

    composite = (f'<g id="tile"><path d="{L["tile"]}" fill="{WHITE}"/></g>\n<g id="qr">{qr_d}</g>\n<g id="brackets">{br}</g>\n<g id="art">{"".join(comp)}</g>')
    color = (f'<g id="COLOR_CMYK">{qr_d}{br}{"".join(color_parts)}</g>')
    white = (f'<g id="WHITE_INK_100">' f'<path d="{L["tile"]}" fill="#000"/>{br_white}{"".join(white_parts)}</g>')
    cut = (f'<g id="CUT" fill="none" stroke="#FF0000" stroke-width="0.1"><path d="{outline}"/>' + "".join(f'<path d="{h}"/>' for h in holes) + "</g>")
    guides = (f'<g id="guides" fill="none" stroke="#999" stroke-width="0.15" stroke-dasharray="1 1"><path d="{outline}"/>' + "".join(f'<path d="{h}"/>' for h in holes) + "</g>")

    os.makedirs(OUT, exist_ok=True)
    files = {
        f"plaque-qr-{variant}_apercu.svg": svg(composite + guides, f"YESIR DESIGN plaque QR ({variant}) - aperçu"),
        f"plaque-qr-{variant}_1-COULEUR-CMJN.svg": svg(color, "Couche 1 - COULEUR (CMJN)"),
        f"plaque-qr-{variant}_2-BLANC.svg": svg(white, "Couche 2 - BLANC 100% (zones en noir = encre blanche)"),
    }
    for name, content in files.items():
        open(f"{OUT}/{name}", "w").write(content)
    open(f"{OUT}/plaque-qr_3-DECOUPE.svg", "w").write(svg(cut, "Couche 3 - DECOUPE laser (contour + 4 trous)"))
    return {"module_mm": round(L["module_mm"], 2), "qr_mm": round(L["qsize"], 1), "version": qr.version, "error": qr.error, "modules": N}

info = {v: render(v) for v in ("clair", "sombre")}
# standalone QR for other uses (stickers, cards)
qr.save(f"{OUT}/qr-seul_yesir-design-web.vercel.app-qr.svg", scale=10, border=4, dark=INK)
qr.save(f"{OUT}/qr-seul_yesir-design-web.vercel.app-qr.png", scale=40, border=4, dark=INK)
print(json.dumps(info, ensure_ascii=False))
