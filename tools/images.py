"""Responsive image pipeline.

For every photo in img/ (originals only) this writes smaller copies named name-<width>.webp,
then keeps the markup in sync:
  * js/main.js  -> the IMG_VARIANTS map used by imgSet() for images rendered from JS
  * *.html      -> srcset on static <img src="img/name.webp"> tags (sizes is kept or defaulted)
Also writes small versions of the logo for the header/footer.

Run after adding or replacing photos:  python tools/images.py  &&  npm run build
"""
import glob
import json
import os
import re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'img')
WIDTHS = [400, 560, 700, 840, 1000, 1400]
QUALITY = 64
VARIANT_RE = re.compile(r'-\d{3,4}$')

# default `sizes` for static images, by file-name prefix
SIZES = {
    'cat-': '(max-width: 680px) 46vw, 25vw', 'look-': '(max-width: 980px) calc(100vw - 36px), 600px',
    'why-tub': '(max-width: 980px) 100vw, 44vw', 'blog-': '(max-width: 680px) 84vw, 33vw',
    'ig-': '(max-width: 680px) 44vw, 16vw', 'pd-': '(max-width: 980px) 100vw, 50vw',
    'col-intro': '(max-width: 980px) 100vw, 55vw', 'story': '(max-width: 980px) 100vw, 50vw',
    'brands-faucet': '(max-width: 980px) 100vw, 45vw', 'hero-': '(max-width: 680px) 100vw, 70vw',
    'showroom-hero': '100vw', 'hero-collection': '100vw',
}


def originals():
    for path in sorted(glob.glob(os.path.join(IMG, '*.webp'))):
        name = os.path.basename(path)[:-5]
        if name.startswith('logo') or VARIANT_RE.search(name):
            continue
        yield name, path


def build_variants():
    variants, keep = {}, set()
    for name, path in originals():
        im = Image.open(path)
        w, h = im.size
        sizes = [x for x in WIDTHS if x < w * 0.92]
        if w < 520 or not sizes:
            continue
        rgb = im.convert('RGB')
        for x in sizes:
            out = os.path.join(IMG, f'{name}-{x}.webp')
            rgb.resize((x, round(h * x / w)), Image.LANCZOS).save(out, quality=QUALITY, method=6)
            keep.add(os.path.basename(out))
        variants[name] = [w] + sizes
    # remove stale generated copies (old widths)
    for path in glob.glob(os.path.join(IMG, '*.webp')):
        base = os.path.basename(path)
        name = base[:-5]
        if VARIANT_RE.search(name) and not name.startswith('logo') and base not in keep:
            os.remove(path)
    return variants


def build_logos():
    for src in ('logo', 'logo-light'):
        im = Image.open(os.path.join(IMG, f'{src}.webp'))
        w, h = im.size
        for x in (260, 400):
            im.resize((x, round(h * x / w)), Image.LANCZOS).save(os.path.join(IMG, f'{src}-{x}.webp'), quality=90, method=6)


def srcset(name, v):
    return ', '.join(f'img/{name}-{x}.webp {x}w' for x in v[1:]) + f', img/{name}.webp {v[0]}w'


def sync_js(variants):
    p = os.path.join(ROOT, 'js', 'main.js')
    s = open(p, encoding='utf-8').read()
    s = re.sub(r'const IMG_VARIANTS = \{.*?\};', 'const IMG_VARIANTS = ' + json.dumps(variants, separators=(',', ':')) + ';', s, count=1, flags=re.S)
    open(p, 'w', encoding='utf-8').write(s)


def sync_html(variants):
    tag_re = re.compile(r'<img\b[^>]*\bsrc="img/([\w-]+)\.webp"[^>]*>')
    for p in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
        s = open(p, encoding='utf-8').read()

        def fix(m):
            tag, name = m.group(0), m.group(1)
            if name not in variants:
                return tag
            tag = re.sub(r'\s(?:srcset|sizes)="[^"]*"', '', tag)
            size = next((v for k, v in SIZES.items() if name.startswith(k)), '(max-width: 680px) 92vw, 50vw')
            old = re.search(r'sizes="([^"]*)"', m.group(0))
            if old and not name.startswith(('hero-', 'showroom-hero')):
                size = old.group(1)
            return tag.replace(f'src="img/{name}.webp"', f'src="img/{name}.webp" srcset="{srcset(name, variants[name])}" sizes="{size}"', 1)

        s2 = tag_re.sub(fix, s)
        # image preloads mirror their <img> (keep each page's imagesizes)
        def fix_preload(m):
            name = m.group(2)
            if name not in variants:
                return m.group(0)
            return f'{m.group(1)} imagesrcset="{srcset(name, variants[name])}"'
        s2 = re.sub(r'(<link rel="preload" as="image" href="img/([\w-]+)\.webp") imagesrcset="[^"]*"', fix_preload, s2)
        if s2 != s:
            open(p, 'w', encoding='utf-8').write(s2)


if __name__ == '__main__':
    v = build_variants()
    build_logos()
    sync_js(v)
    sync_html(v)
    print(f'{len(v)} photos with responsive copies')
