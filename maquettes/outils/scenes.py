"""Petites scènes à la plume pour les pages intérieures : découpe un dessin, en tire un masque d'encre léger (WebP).

usage : uv run --with pillow --with numpy python -I outils/scenes.py outils/scenes.json [planche.jpg] [nom …]

Chaque entrée de scenes.json : nom, source (dessin à l'encre : fond blanc, ou fond transparent), boite [x0, y0, x1, y1]
dans l'image d'origine, effacer (polygones à vider), garder (polygones à conserver), fondu (largeur du fondu sur les
bords coupés, en fraction), cote (plus grand côté du fichier produit, 520 par défaut).
Sortie : img2/scene-<nom>.webp, blanc dont l'opacité est l'encre — à utiliser en masque CSS, teinté par la page."""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

RACINE = Path(__file__).resolve().parent.parent


def encre(chemin):
    im = Image.open(RACINE / chemin)
    a = np.array(im.convert('RGBA')).astype(np.float32)
    if a[..., 3].min() < 250:  # dessin déjà détouré : l'opacité est l'encre
        return a[..., 3]
    lum = a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114
    return np.clip((236 - lum) / (236 - 58), 0, 1) * 255  # papier → 0, encre → 255


def poly(taille, polys, x0, y0, valeur, fond):
    m = Image.new('L', taille, fond)
    d = ImageDraw.Draw(m)
    for p in polys:
        d.polygon([(x - x0, y - y0) for x, y in p], fill=valeur)
    return np.array(m).astype(np.float32) / 255


def scene(j):
    a = encre(j['source'])
    x0, y0, x1, y1 = j['boite']
    a = a[y0:y1, x0:x1].copy()
    h, w = a.shape
    if 'garder' in j:
        a *= np.array(Image.fromarray((poly((w, h), j['garder'], x0, y0, 255, 0) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(j.get('plume', 2.5)))).astype(np.float32) / 255
    if 'effacer' in j:
        a *= np.array(Image.fromarray((poly((w, h), j['effacer'], x0, y0, 0, 255) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(j.get('plume', 2.5)))).astype(np.float32) / 255
    f = j.get('fondu', 0)
    if f:  # les bords coupés s'éteignent au lieu de s'arrêter net
        cotes = j.get('cotes', 'ghdb')
        rx = np.ones(w, np.float32); ry = np.ones(h, np.float32)
        n = max(2, int(w * f)); r = np.linspace(0, 1, n) ** 1.4
        if 'g' in cotes: rx[:n] = r
        if 'd' in cotes: rx[-n:] = r[::-1]
        n = max(2, int(h * f)); r = np.linspace(0, 1, n) ** 1.4
        if 'h' in cotes: ry[:n] = r
        if 'b' in cotes: ry[-n:] = r[::-1]
        a *= ry[:, None] * rx[None, :]
    a[a < 14] = 0
    ys, xs = np.where(a > 40)
    b = 4
    a = a[max(0, ys.min() - b):ys.max() + 1 + b, max(0, xs.min() - b):xs.max() + 1 + b]
    h, w = a.shape
    cote = j.get('cote', 520)
    k = min(1, cote / max(w, h))
    im = Image.fromarray(a.astype(np.uint8)).resize((max(1, round(w * k)), max(1, round(h * k))), Image.LANCZOS)
    rgba = Image.merge('RGBA', (Image.new('L', im.size, 255),) * 3 + (im,))
    sortie = RACINE / 'img2' / f"scene-{j['nom']}.webp"
    rgba.save(sortie, quality=80, alpha_quality=82, method=6, exact=False)
    return sortie, im


def main():
    jobs = json.loads(Path(sys.argv[1]).read_text())
    planche = next((x for x in sys.argv[2:] if x.endswith('.jpg')), None)
    noms = [x for x in sys.argv[2:] if not x.endswith('.jpg')]
    vues = []
    for j in jobs:
        if noms and j['nom'] not in noms:
            continue
        f, im = scene(j)
        print(f"{f.name:34} {im.width}x{im.height}  ratio {im.width} / {im.height}  {f.stat().st_size // 1024} Ko")
        H = 260
        v = np.array(im.resize((max(1, round(im.width * H / im.height)), H), Image.LANCZOS)).astype(np.float32) / 255
        vues.append(np.stack([255 - v * (255 - c) * 0.9 for c in (27, 42, 74)], -1).astype(np.uint8))
    if planche and vues:
        lignes, ligne, L = [], [], 0
        for v in vues:
            if L + v.shape[1] > 1500 and ligne:
                lignes.append(ligne); ligne, L = [], 0
            ligne.append(v); L += v.shape[1] + 30
        lignes.append(ligne)
        larg = max(sum(v.shape[1] + 30 for v in l) for l in lignes) + 30
        bandes = []
        for l in lignes:
            bande = np.full((300, larg, 3), 255, np.uint8); x = 30
            for v in l:
                bande[20:280, x:x + v.shape[1]] = v; x += v.shape[1] + 30
            bandes.append(bande)
        Image.fromarray(np.concatenate(bandes, 0)).save(planche, quality=88)


main()
