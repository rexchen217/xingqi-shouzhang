# 星契手账 · 你的现实，就是卡池

> 把「完成游戏任务 → 领取奖励 → 抽卡养成」那一套，原封不动搬进现实。
> 你在真实世界里做成的每一件小事，都会变成星愿池里的一次抽取。

## 这是什么

一款二次元自律手账：打卡、日程、番茄钟与连击构成你每天的现实进度，
进度攒成星愿石，星愿石换抽卡券，抽卡券揭开一张张**专属立绘**。
图鉴收集、等级称号、羁绊互动、星语密卷——全部装进**一个 `.html` 文件**，双击即开，也能直接装成 Android App。

换句话说：**过去的奖励来自游戏任务，现在的奖励来自你真实的生活。**
这或许不只是换个地方打卡，而是你重新开始自律的起点。

## 核心循环

现实里坚持 → 攒下星愿石 → 祈愿抽卡 → 收进图鉴、加深羁绊 → 更想继续坚持下去

- **你负责自律**：日常任务、铁律、补做安排、番茄钟专注计时、连续打卡连击。
- **她负责回应**：UR / XR 立绘、觉醒形态一键切换、专属密语、心意回礼。
- 抽卡有独立保底与概率公示，印记可兑换——不存在「抽不到」的无底洞，只看你肯不肯坚持。

## 一个文件里能做什么

| 模块 | 内容 |
| --- | --- |
| 打卡签到 | 连击天数、里程碑称号与头像框、补签卡 / 免罚卡 |
| 日程任务 | 铁律、默认日程、未来安排、补做任务，今日收益明细（任务 / 铁律 / 补做 / 支出） |
| 专注 | 番茄钟：后台计时兜底、回到前台立即重算、结束震动 + 音效双提醒 |
| 祈愿抽卡 | 十连与单抽、XR 独立保底、概率公示、抽卡揭晓动画 |
| 图鉴 | 收集完成度、四档里程碑奖励、12 档等级与专属称号、UR 双形态立绘全覆盖 |
| 羁绊互动 | 更换互动对象、双形态切换、送礼（星愿石消耗）、星语密卷解锁专属密语 |
| 星愿商店 | 兑换 / 道具 / 装扮 / 玩法 四分区：星愿券、必得券、补签卡、免罚卡、头像框、称号、星尘扭蛋、星轨存钱罐、星愿许愿池 |
| 自律回顾 | 基于历史记录生成周 / 月回顾报告 |
| 设置 | 音效、震动、存档导出与备份恢复、错误日志、恢复默认日程（带二次确认） |

所有支出与购买都有二次确认弹窗，误触不会掉资源。

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
- 项目为纯前端单文件应用，数据保存在浏览器 localStorage，不涉及服务端；存档可随时导出备份。
