# 构建：src/template.html + src/data.js → 星契手账.html（单文件，可直接双击运行 / 打包进 APK）
# 用法：python tools/build.py [输出路径]
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 仓库根目录
SRC  = os.path.join(ROOT, 'src')
MARK = '/*__DATA_SECTION__*/'

tpl  = open(os.path.join(SRC, 'template.html'), encoding='utf-8').read()
data = open(os.path.join(SRC, 'data.js'), encoding='utf-8').read()

if MARK not in tpl:
    sys.exit('模板里找不到数据占位符 ' + MARK)

out = tpl.replace(MARK, data)
dst = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '星契手账.html')
open(dst, 'w', encoding='utf-8', newline='').write(out)
print('构建完成 →', dst, '(%d KB)' % (len(out.encode('utf-8')) // 1024))
