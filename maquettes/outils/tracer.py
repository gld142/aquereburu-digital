"""Tire de petites gravures au trait net (SVG) des dessins à la plume du site.

usage : uv run --with opencv-python-headless --with pillow --with numpy python -I outils/tracer.py outils/vignettes.json [planche.jpg] [nom …]

Chaque entrée de vignettes.json : nom, source (dessin à l'encre, fond transparent), boite [x0, y0, x1, y1],
garder (contours à conserver), effacer (zones à vider), seuil, flou, mode ("corps" : on ne garde que ce qui
tient à une masse d'encre ; "decor" : on garde tout). Les coordonnées sont celles de l'image d'origine.
Le tracé final est fait par potrace (courbes lisses)."""
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ICI = Path(__file__).resolve().parent
RACINE = ICI.parent
ENCRE = '#1b2a4a'


def disque(d):
    d = max(1, int(round(d)))
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (d, d))


def contour(pts, x0, y0, k):
    return ((np.array(pts, np.float32).reshape(-1, 2) - [x0, y0]) * k).astype(np.int32)


def masque(j):
    a = np.array(Image.open(RACINE / j['source']).convert('RGBA'))[..., 3]
    x0, y0, x1, y1 = j['boite']
    k = j.get('k', 3)
    a = cv2.resize(a[y0:y1, x0:x1].astype(np.float32), None, fx=k, fy=k, interpolation=cv2.INTER_CUBIC)
    brut = a
    a = cv2.GaussianBlur(a, (0, 0), j.get('flou', 0.8) * k)
    m = np.where(a > j.get('seuil', 110), 255, 0).astype(np.uint8)
    # zones fines : cheveux blancs, crânes clairs… on y garde le trait léger, sinon la tête disparaît
    for z in j.get('fin', []):
        f = np.where(cv2.GaussianBlur(brut, (0, 0), z.get('flou', 0.4) * k) > z.get('seuil', 60), 255, 0).astype(np.uint8)
        g = np.zeros_like(m)
        cv2.fillPoly(g, [contour(z['zone'], x0, y0, k)], 255)
        m = np.where(g > 0, f, m)
    if 'garder' in j:
        g = np.zeros_like(m)
        for p in j['garder']:
            cv2.fillPoly(g, [contour(p, x0, y0, k)], 255)
        m &= g
    for p in j.get('effacer', []):
        cv2.fillPoly(m, [contour(p, x0, y0, k)], 0)
    if j.get('mode', 'corps') == 'corps':
        # on ne garde que l'encre qui tient à une masse (un corps) : les traits fins isolés du décor disparaissent
        masse = cv2.morphologyEx(m, cv2.MORPH_OPEN, disque(j.get('masse', 3.4) * k))
        n, lab, st, _ = cv2.connectedComponentsWithStats(masse, 8)
        for i in range(1, n):
            if st[i, cv2.CC_STAT_AREA] < j.get('masse_min', 260) * k * k:
                masse[lab == i] = 0
        # les traits fins et horizontaux qui dépassent d'un corps sont des restes d'horizon ou de sol : on les retire
        if j.get('horizon', True):
            long = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (int(j.get('ligne', 9) * k), 1)))
            long[cv2.dilate(masse, disque(3 * k)) > 0] = 0
            m[cv2.dilate(long, disque(1.6 * k)) > 0] = np.where(masse > 0, 255, 0)[cv2.dilate(long, disque(1.6 * k)) > 0]
        m &= cv2.dilate(masse, disque(j.get('halo', 7) * k))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] < j.get('grain', 5) * k * k:
            m[lab == i] = 0
    ys, xs = np.where(m > 0)
    b = 2 * k
    bas = min(m.shape[0], ys.max() + 1 + (0 if j.get('pied') else b))
    m = m[max(0, ys.min() - b):bas, max(0, xs.min() - b):min(m.shape[1], xs.max() + 1 + b)]
    return m


def tracer(j, m):
    sortie = RACINE / 'img2' / f"gravure-{j['nom']}.svg"
    with tempfile.TemporaryDirectory() as t:
        pgm = Path(t) / 'm.pgm'
        Image.fromarray(255 - m).save(pgm)
        brut = Path(t) / 'm.svg'
        subprocess.run(['potrace', '-s', '--flat', '-t', str(int(j.get('grain', 5) * j.get('k', 3) ** 2)), '-a', '1.05',
                        '-O', str(j.get('tolerance', 0.5)), '-u', '4', '-o', str(brut), str(pgm)], check=True)
        s = brut.read_text()
    g = re.search(r'<g transform="([^"]+)"', s).group(1)
    chemins = ''.join(re.findall(r'<path d="[^"]+"/>', re.sub(r'\s+', ' ', s)))
    h, w = m.shape
    sortie.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><g transform="{g}" fill="{ENCRE}">{chemins}</g></svg>\n')
    return sortie, w, h


def main():
    jobs = json.loads(Path(sys.argv[1]).read_text())
    planche = next((a for a in sys.argv[2:] if a.endswith('.jpg')), None)
    noms = [a for a in sys.argv[2:] if not a.endswith('.jpg')]
    vues = []
    for j in jobs:
        if noms and j['nom'] not in noms:
            continue
        m = masque(j)
        h, w = m.shape
        if j.get('webp'):
            # grande gravure : trop lourde en tracé, on la livre en image de masque (blanc, opacité = encre)
            L = j.get('largeur', 1500)
            a = cv2.resize(m, (L, round(L * h / w)), interpolation=cv2.INTER_AREA)
            rgba = np.full((*a.shape, 4), 255, np.uint8)
            rgba[..., 3] = a
            f = RACINE / j['webp']
            Image.fromarray(rgba).save(f, lossless=True, method=6)
        else:
            f, w, h = tracer(j, m)
        print(f"{f.name}  {w}x{h}  {f.stat().st_size // 1024} Ko")
        H = 520
        v = cv2.resize(m, (max(1, round(w * H / h)), H), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
        vues.append(np.stack([255 - v * (255 - c) for c in (27, 42, 74)], -1).astype(np.uint8))
    if planche and vues:
        blanc = np.full((520, 30, 3), 255, np.uint8)
        ligne = np.concatenate([x for v in vues for x in (blanc, v)] + [blanc], 1)
        Image.fromarray(np.pad(ligne, ((20, 20), (0, 0), (0, 0)), constant_values=255)).save(planche, quality=90)


main()
