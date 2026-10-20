# 重打包：以「上一轮已签名的 APK」为基底，就地替换 index.html 与 art/*.webp，产出未签名的 _pkg-unsigned.apk
# 这样增量打包体积小、且能沿用原有签名链。用法：python tools/repack.py
import os, zipfile, glob, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 自动取版本号最大的 星契日程-v*.apk 作为基底（缺失时请在根目录放一个已签名 APK）
cands = glob.glob(os.path.join(ROOT, '星契日程-v*-debug.apk'))
def _ver(p):
    m = re.search(r'v(\d+)\.(\d+)', os.path.basename(p))
    return (int(m.group(1)), int(m.group(2))) if m else (0, 0)
SRC  = sorted(cands, key=_ver)[-1] if cands else ''
DST  = os.path.join(ROOT, '_pkg-unsigned.apk')
HTML = os.path.join(ROOT, '星契手账.html')
ART  = os.path.join(ROOT, 'art')
INDEX  = 'assets/public/index.html'
ARTDIR = 'assets/public/art/'

print('base apk:', os.path.basename(SRC))
new_html = open(HTML, 'rb').read()
art_files = [n for n in sorted(os.listdir(ART)) if n.lower().endswith('.webp')]

with zipfile.ZipFile(SRC) as zin:
    infos = zin.infolist()
    art_ctype = next((i.compress_type for i in infos if i.filename.startswith(ARTDIR)), zipfile.ZIP_DEFLATED)
    base_art = set(i.filename for i in infos if i.filename.startswith(ARTDIR))
    replaced = dropped = added = 0
    with zipfile.ZipFile(DST, 'w', zipfile.ZIP_DEFLATED) as zout:
        for info in infos:
            fn = info.filename
            if fn.startswith(ARTDIR) and fn.lower().endswith('.jpg'):
                dropped += 1                 # 旧包里的 jpg 立绘已整批被 webp 取代，不再打包
                continue
            data = zin.read(fn)
            if fn == INDEX:
                data = new_html; replaced += 1
            elif fn.startswith(ARTDIR):
                p = os.path.join(ART, os.path.basename(fn))
                if os.path.exists(p):
                    data = open(p, 'rb').read(); replaced += 1
            zout.writestr(info, data)
        for n in art_files:
            if ARTDIR + n in base_art:
                continue                     # 基底包已有该资源：上面已就地替换，避免重复条目
            zi = zipfile.ZipInfo(ARTDIR + n, date_time=(2026, 10, 18, 12, 0, 0))
            zi.compress_type = art_ctype
            zi.external_attr = 0o100644 << 16
            zout.writestr(zi, open(os.path.join(ART, n), 'rb').read())
            added += 1

with zipfile.ZipFile(DST) as z:
    assert z.testzip() is None, 'zip broken'
    print('index.html in new apk:', z.getinfo(INDEX).file_size, 'bytes')
    print('art files in new apk:', sum(1 for x in z.namelist() if x.startswith(ARTDIR)))
print('replaced', replaced, 'dropped', dropped, 'added', added,
      '| unsigned apk MB: %.1f' % (os.path.getsize(DST) / 1048576))
