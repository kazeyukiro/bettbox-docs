---
sidebar_position: 9
---

# 从源码构建

本页面向希望自行编译的开发者。普通用户请直接使用 [Releases](https://github.com/appshubcc/Bettbox/releases/latest) 安装包。

---

## 1. 仓库结构

| 路径 | 内容 |
| :--- | :--- |
| `lib/` | Flutter 应用代码（`views/`、`pages/`、`manager/`、`providers/`、`models/`、`l10n/` 等） |
| `core/Clash.Meta/` | 内置 Mihomo 内核源码 |
| `core/` | Go 桥接层与 `core/toolbox/` 原生工具 |
| `plugins/` | 本地插件：`code_forge`、`proxy`、`tray_manager`、`window_ext`、`launch_at_startup` 等 |
| `android/`、`windows/`、`macos/`、`linux/` | 平台工程与打包脚本 |
| `arb/` | 多语言文案，如 `intl_zh_CN.arb` |
| `assets/` | 图标、脚本、数据（含 `assets/scripts/managed.js`） |
| `services/` | 辅助服务 |
| `setup.dart` | 统一构建脚本 |
| `Makefile`、`build.yaml`、`distribute_options.yaml` | 辅助构建配置 |

---

## 2. 依赖环境

以 Windows 为例：Windows 10 及以上，依赖 Git、Visual Studio、Flutter、Golang、Inno Setup、Rust。

**注意**：Flutter 已升级到 3.50.x；构建流程固定为 **Flutter 3.50.1**（ARM runner 使用 `master` channel），Go 为 **1.25.x**（兼容版构建用 1.24.x）。构建时以 CI 配置为准。

| 平台 | CI 关键依赖 |
| :--- | :--- |
| 通用 | Flutter 3.50.1 / master，Go 1.25.x 或 1.24.x |
| Android | Android NDK `28.2.13676358`；Rust 目标 `aarch64-linux-android`、`armv7-linux-androideabi`、`x86_64-linux-android`、`i686-linux-android` |
| Windows | Rust 目标 `x86_64-pc-windows-msvc` / `aarch64-pc-windows-msvc`；SignPath 签名流程；Inno Setup 打包 |
| Linux | `libcurl4-openssl-dev`、`ninja-build`、`libgtk-3-dev`、`rpm` |
| macOS | Xcode 26；Rust 目标 `x86_64-apple-darwin` / `aarch64-apple-darwin` |

---

## 3. 构建命令

```bash
# 获取依赖
flutter pub get

# 仅构建内核（Windows / amd64 示例）
dart setup.dart windows --arch amd64 --out core

# 构建完整应用（可选兼容版）
dart setup.dart windows --arch amd64 --out app --compatible

# 构建完整内核版（包含 EasyTier / Tailscale / Zerotier / gVisor 等）
dart setup.dart windows --arch amd64 --out app --standard
```

在 Windows 下也可使用 `dart .\setup.dart ...` 的路径写法，效果相同。构建产物位于 `dist/`，内核中间产物输出到 `libclash/`。

### `setup.dart` 参数

| 参数 | 说明 |
| :--- | :--- |
| `<platform>` | `windows` / `linux` / `macos` / `android` |
| `--arch` | `amd64` / `arm64` / `arm` / `auto` 等；Android 对应 `arm64-v8a`、`armeabi-v7a`、`x86_64` |
| `--out` | `app`（完整应用）、`core`、`core-only`、`helper` |
| `--core-hash` | `--out=helper` 时嵌入已签名内核的 SHA256 |
| `--env` | `pre` / `stable` |
| `--compatible` | 旧 CPU 兼容版；代码中 Windows / Linux amd64 用 `GOAMD64=v1`，标准为 `v3` |
| `--standard` | 构建 Standard 变体，包含 EasyTier、Tailscale、Zerotier、fake-tcp、gVisor |
| `--dev` | 调试变体 |
| `--ensure` | 产物已存在时跳过构建 |
| `--core-version` | 注入内核版本字符串 |

:::note 帮助文本与实现差异
兼容版实际以 `GOAMD64=v1` 编译，标准版为 `v3`。
:::

---

## 4. 官方构建矩阵

构建矩阵定义如下：

| 平台 | 架构 | Standard | Compatible |
| :--- | :--- | :--- | :--- |
| Android | arm64 / amd64 / arm / universal | 是 | 否 |
| Windows | amd64 / arm64 | 是 | amd64 |
| macOS | arm64 / amd64 | 是 | 否 |
| Linux | amd64 / arm64 | 是 | amd64 |

Windows 构建还会先产出内核与 HelperService，经 SignPath 签名后再打包安装器；本地构建不会带官方签名。

---

## 5. 内置数据下载

构建脚本会从以下地址下载并内置：

| 文件 | 来源 |
| :--- | :--- |
| `geosite.dat` | `appshubcc/bett-rules` Releases |
| `geoip.metadb` | 同上 |
| `GeoLite2-ASN-lite.mmdb`（保存为 `ASN.mmdb`） | 同上 |
| `BundleMRS.7z` | 同上 |
| `dist-no-fonts.zip` | Zephyruso/zashboard v3.29.1（Web UI） |

应用内「更多 → 外部资源」可查看与更新这些资源。

---

## 6. 开源协议

项目采用 [GPL-3.0](https://github.com/appshubcc/Bettbox/blob/main/LICENSE) 协议。二次开发与分发请遵守协议要求。
