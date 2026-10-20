# 星契手账 · 一键打包：build（可选）→ 重打包 → zipalign → 签名 → 校验 → 改名
# 用法：powershell -ExecutionPolicy Bypass -File tools\pack.ps1 -Version v3.10
#
# 依赖本地工具链（不入库），默认放在 <仓库根>\_toolchain\ 下，也可用环境变量 XINGQI_TOOLCHAIN 指定：
#   _toolchain\jdk-extract\jdk-17.0.20.1+1\      JDK 17
#   _toolchain\android-14\zipalign.exe           Android build-tools
#   _toolchain\android-14\apksigner.bat
# 签名用 %USERPROFILE%\.android\debug.keystore（别名 androiddebugkey / 口令 android）。
param([string]$Version = 'v3.10', [switch]$NoBuild)
$ErrorActionPreference = 'Stop'

$PROJ = Split-Path -Parent $PSScriptRoot                                            # 仓库根目录
$WORK = $PSScriptRoot                                                               # 本脚本所在目录（tools）
$TOOLCHAIN = if($env:XINGQI_TOOLCHAIN){ $env:XINGQI_TOOLCHAIN } else { Join-Path $PROJ '_toolchain' }
$JDK   = Join-Path $TOOLCHAIN 'jdk-extract\jdk-17.0.20.1+1'
$env:JAVA_HOME = $JDK
$env:PATH = (Join-Path $JDK 'bin') + ';' + $env:PATH

if(-not $NoBuild){ python (Join-Path $WORK 'build.py') }
python (Join-Path $WORK 'repack.py') | Write-Host

$unsigned = Join-Path $PROJ '_pkg-unsigned.apk'
$aligned  = Join-Path $PROJ '_pkg-aligned.apk'
$signed   = Join-Path $PROJ '_pkg-signed.apk'

& (Join-Path $TOOLCHAIN 'android-14\zipalign.exe') -p -f 4 $unsigned $aligned
if($LASTEXITCODE -ne 0){ throw 'zipalign 失败' }
& (Join-Path $TOOLCHAIN 'android-14\apksigner.bat') sign --ks "$env:USERPROFILE\.android\debug.keystore" `
    --ks-pass pass:android --key-pass pass:android --ks-key-alias androiddebugkey `
    --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true `
    --out $signed $aligned
if($LASTEXITCODE -ne 0){ throw 'apksigner 签名失败' }
& (Join-Path $TOOLCHAIN 'android-14\apksigner.bat') verify --print-certs $signed
if($LASTEXITCODE -ne 0){ throw '签名校验失败' }

$BaseName = [string]([char]0x661F + [char]0x5951 + [char]0x65E5 + [char]0x7A0B)   # 星契日程（避免脚本编码问题）
$out = Join-Path $PROJ ($BaseName + "-" + $Version + "-debug.apk")
Move-Item $signed $out -Force
Remove-Item $unsigned, $aligned -Force -ErrorAction SilentlyContinue
Remove-Item ($signed + '.idsig') -Force -ErrorAction SilentlyContinue
Write-Host ("打包完成: " + $out + "  (" + [math]::Round((Get-Item $out).Length/1MB,1) + " MB)")
