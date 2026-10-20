# 星契手账 · 二次元自律契约

一个「单文件 HTML」的二次元自律手账：打卡签到、日程任务、番茄钟专注、连击里程碑、
等级奖励、图鉴收集、祈愿抽卡、星愿商店、互动羁绊等模块，全部封装进 **一个 `.html` 文件**，
双击即可运行，也可直接打包成 Android APK。

## 直接体验

- 双击根目录的 `星契手账.html` 即可在浏览器打开（推荐 Chrome / Edge）。
- 想装到手机上：下载 Releases 里的 APK，覆盖安装即可（内部使用固定调试签名，可直接升级覆盖）。

## 仓库结构

```
星契手账.html          # 成品单文件（由 tools/build.py 生成，勿手改数据区）
src/
  template.html        # 页面结构 + 全部业务逻辑（CSS / JS）
  data.js              # 独立数据配置（铁律、默认日程、角色卡池等），经占位符注入模板
art/                   # 立绘资源：720 张 WebP（含 _t 分级缩略图）
tools/
  build.py             # src/template.html + src/data.js → 星契手账.html
  split.py             # 反向拆分：把单文件里的数据区抽回 src/（带逐字节等价断言）
  chk.py               # 抽取内联 JS → _chk.js，供 node --check 做语法自检
  repack.py            # 以上一版已签名 APK 为基底，就地替换网页与立绘，产出未签名包
  pack.ps1             # 一键：build → repack → zipalign → 签名 → 校验 → 改名
  verify_apk.py        # APK 一致性校验（zip 完整性 / index.html 与源一致 / 立绘计数 / 体积）
```

## 开发与构建

```bash
# 改完 src/ 后重新生成单文件产物
python tools/build.py

# 语法自检（需本机有 node）
python tools/chk.py && node --check _chk.js
```

数据与逻辑是分离的：`src/data.js` 只放配置数据，`src/template.html` 只放结构与逻辑，
`build.py` 通过 `/*__DATA_SECTION__*/` 占位符把数据注入回模板，因此构建产物是自包含的单文件。

## 打包 APK

`tools/pack.ps1` 需要本地工具链（**不入库**），目录约定如下，或用环境变量 `XINGQI_TOOLCHAIN` 指定：

```
<仓库根>\_toolchain\jdk-extract\jdk-17.0.20.1+1\   JDK 17
<仓库根>\_toolchain\android-14\zipalign.exe        Android build-tools
<仓库根>\_toolchain\android-14\apksigner.bat
```

然后：

```powershell
powershell -ExecutionPolicy Bypass -File tools\pack.ps1 -Version v3.10
python tools\verify_apk.py
```

签名使用 `%USERPROFILE%\.android\debug.keystore`（别名 `androiddebugkey`，口令 `android`）。
**请固定使用同一份 keystore**，否则新包无法覆盖安装旧版。

## 发布

```bash
git tag v3.10
git push origin main --tags
gh release create v3.10 "星契日程-v3.10-debug.apk" --title "v3.10" --notes "更新说明"
```

## 说明

- 立绘为 AI 生成素材，仅供个人学习与自用；如需公开传播请注意相关合规要求。
- 项目为纯前端单文件应用，数据保存在浏览器 localStorage，不涉及服务端。
