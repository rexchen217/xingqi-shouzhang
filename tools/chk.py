# 语法自检：把单文件 HTML 里的内联 <script> 抽出来拼成 _chk.js，供 node --check 校验
# 用法：python tools/chk.py [HTML 路径]
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '星契手账.html')
s = open(p, encoding='utf-8').read()
blocks = re.findall(r'<script[^>]*>(.*?)</script>', s, re.S)
out = os.path.join(ROOT, '_chk.js')
open(out, 'w', encoding='utf-8').write('\n;\n'.join(blocks))
print('blocks', len(blocks), '| js chars', sum(len(b) for b in blocks))
