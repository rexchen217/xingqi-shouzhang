# APK 一致性校验：zip 完整性 + index.html 与源 HTML 逐字节一致 + 立绘资源计数 + 包体积
# 用法：python tools/verify_apk.py [APK 路径]   （缺省则取根目录下版本号最大的 星契日程-v*.apk）
import hashlib, zipfile, os, sys, glob, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html = open(os.path.join(ROOT, '星契手账.html'), 'rb').read()
h_html = hashlib.sha256(html).hexdigest()

if len(sys.argv) > 1:
    apk = sys.argv[1]
else:
    cands = glob.glob(os.path.join(ROOT, '星契日程-v*.apk'))
    def key(p):
        m = re.search(r'v(\d+)\.(\d+)', os.path.basename(p))
        return (int(m.group(1)), int(m.group(2))) if m else (0, 0)
    apk = sorted(cands, key=key)[-1] if cands else ''

ok = True
if not apk or not os.path.exists(apk):
    print('APK not found:', apk); sys.exit(1)
print('apk:', os.path.basename(apk))

with zipfile.ZipFile(apk) as z:
    bad = z.testzip()
    names = z.namelist()
    idx = z.read('assets/public/index.html')
    arts = [n for n in names if n.startswith('assets/public/art/')]
    webp = [n for n in arts if n.lower().endswith('.webp')]
    jpg  = [n for n in arts if n.lower().endswith('.jpg')]
    thumbs = [n for n in webp if n[:-5].endswith('_t')]
    h_idx = hashlib.sha256(idx).hexdigest()

zip_ok   = (bad is None)
html_ok  = (h_idx == h_html)
art_ok   = (len(webp) > 0 and len(jpg) == 0)
print('zip integrity :', 'OK' if zip_ok else ('BROKEN ' + str(bad)))
print('index.html == source html :', html_ok, '(%d bytes)' % len(idx))
print('art entries   : webp=%d (thumbs=%d) jpg=%d' % (len(webp), len(thumbs), len(jpg)))
print('apk size MB   : %.1f' % (os.path.getsize(apk) / 1048576))

ok = zip_ok and html_ok and art_ok
print('RESULT :', 'PASS' if ok else 'FAIL')
sys.exit(0 if ok else 1)
