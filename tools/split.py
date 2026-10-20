# 拆分：把单文件 HTML 里的「数据区」抽到 src/data.js，其余留在 src/template.html
# 拆分后 build.py 会把 data.js 原样注入回原位置，因此构建产物与拆分前逐字节等价（脚本内有断言）。
# 用法：python tools/split.py
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, '星契手账.html')
SRC  = os.path.join(ROOT, 'src')
START = '/* ================= 铁律 ================= */'
END   = '/* ================= 状态 ================= */'
MARK  = '/*__DATA_SECTION__*/'
NOTE  = '<!-- 本文件由 build.py 从 src/template.html + src/data.js 生成，请勿直接手改数据；改完请运行 build.py -->'

os.makedirs(SRC, exist_ok=True)
s = open(HTML, encoding='utf-8').read()
s = s.replace(NOTE + '\n', '', 1)   # 若已构建过，先去掉 NOTE 保证幂等
i = s.index(START)
j = s.index(END)
data = s[i:j]
tpl = s[:i] + MARK + s[j:]
tpl = tpl.replace('<!DOCTYPE html>', NOTE + '\n<!DOCTYPE html>', 1)

open(os.path.join(SRC, 'data.js'), 'w', encoding='utf-8', newline='').write(data)
open(os.path.join(SRC, 'template.html'), 'w', encoding='utf-8', newline='').write(tpl)

# 等价性校验：去掉 NOTE 后，把 MARK 换回 data 必须逐字节还原原文
rebuilt = tpl.replace(NOTE + '\n', '', 1).replace(MARK, data)
assert rebuilt == s, '拆分后重组与原文件不一致！'
print('OK 拆分完成：data.js %d KB / template.html %d KB，重组校验一致' % (len(data)//1024, len(tpl)//1024))
