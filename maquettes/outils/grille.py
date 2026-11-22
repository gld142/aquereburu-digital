"""Aperçu d'un morceau de dessin avec une grille graduée (coordonnées de l'image d'origine), pour choisir un cadrage."""
import sys
import numpy as np
from PIL import Image, ImageDraw

src, out, x0, y0, x1, y1 = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
pas = int(sys.argv[7]) if len(sys.argv) > 7 else 50
a = np.array(Image.open(src).convert('RGBA'))[y0:y1, x0:x1, 3].astype(np.float32) / 255
rgb = np.stack([255 - a * (255 - c) for c in (27, 42, 74)], -1).astype(np.uint8)
z = max(1, round(1500 / (x1 - x0)))
im = Image.fromarray(rgb).resize(((x1 - x0) * z, (y1 - y0) * z), Image.LANCZOS)
d = ImageDraw.Draw(im)
for x in range((x0 // pas + 1) * pas, x1, pas):
    d.line([((x - x0) * z, 0), ((x - x0) * z, im.height)], fill=(230, 80, 60), width=1)
    d.text(((x - x0) * z + 3, 3), str(x), fill=(200, 30, 20))
for y in range((y0 // pas + 1) * pas, y1, pas):
    d.line([(0, (y - y0) * z), (im.width, (y - y0) * z)], fill=(230, 80, 60), width=1)
    d.text((3, (y - y0) * z + 3), str(y), fill=(200, 30, 20))
im.save(out, quality=88)
print(out, im.size)
