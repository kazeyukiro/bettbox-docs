---
sidebar_position: 9
---

# 从源码构建

本页整理自 [Bettbox 源码仓库](https://github.com/appshubcc/Bettbox)的 README「开发构建」章节、`setup.dart` 与 CI 工作流 `.github/workflows/build.yaml`，供希望自行编译的开发者参考。普通用户请直接使用 [Releases](https://github.com/appshubcc/Bettbox/releases/latest) 中的安装包。

---

## 仓库结构

| 路径 | 内容 |
| :--- | :--- |
| `lib/` | Flutter 应用主代码（`views/`、`pages/`、`widgets/`、`manager/` 等） |
| `core/Clash.Meta/` | 内置的 Mihomo（Clash Meta）内核源码 |
| `core/`（Go 桥接层、`core/toolbox/`） | 内核与工具箱原生能力 |
| `plugins/` | 本地插件：`code_forge`（编辑器）、`proxy`、`tray_manager`、`window_ext` 等 |
| `android/`、`windows/`、`macos/`、`linux/` | 各平台工程 |
| `arb/` | 多语言文案（`intl_zh_CN.arb` 等） |
| `setup.dart` | 统一构建脚本 |

---

## 依赖环境

以 **Windows 平台构建**为例（README 原文）：

- 系统需求：Windows 10 及以上
- 依赖：Git、Visual Studio、Flutter 3.47.x、Golang、Inno Setup、Rust

CI 工作流中固定的版本与额外依赖：

| 平台 | CI 关键依赖 |
| :--- | :--- |
| 通用 | Flutter `3.47.7`（`stable`，ARM runner 用 `master`）、Go `1.25.x`（Compatible 版用 `1.24.x`） |
| Android | Java、Android NDK `28.2.13676358`、Rust 目标 `aarch64-linux-android` / `armv7-linux-androideabi` / `x86_64-linux-android` / `i686-linux-android` |
| Windows | Rust 目标 `x86_64-pc-windows-msvc` 或 `aarch64-pc-windows-msvc`，SignPath 签名流程 |
| Linux | `libcurl4-openssl-dev`、`ninja-build`、`libgtk-3-dev`、`rpm` |
| macOS | Xcode、Rust 目标 `x86_64-apple-darwin` / `aarch64-apple-darwin` |

---

## 构建命令

```bash
# 1. 获取依赖
flutter pub get

# 2. 生成代码（CI 中使用）
dart run build_runner build

# 3. 仅构建内核（以 Windows / amd64 为例）
dart setup.dart windows --arch amd64 --out core

# 4. 构建完整应用（加 --compatible 可产出兼容版）
dart setup.dart windows --arch amd64 --out app --compatible
```

Windows 下 README 使用 `dart .\setup.dart ...` 的路径写法，效果相同。构建完成后，最终产物位于 `dist/` 目录；内核中间产物输出到 `libclash/`（`setup.dart` 中的 `Build.outDir`）。

### `setup.dart` 常用参数

| 参数 | 说明 |
| :--- | :--- |
| `<platform>` | `windows` / `linux` / `macos` / `android` |
| `--arch` | `amd64` / `arm64` / `arm` / `auto`；Android 对应 `arm64-v8a`、`armeabi-v7a`、`x86_64` |
| `--out` | `app`（完整应用）、`core`、`core-only`（仅内核，Windows CI 使用）、`helper`（Windows 辅助服务） |
| `--core-hash` | `--out=helper` 时嵌入已签名内核的 SHA256 |
| `--compatible` | 以 `GOAMD64=v1` 编译兼容版；标准版为 `GOAMD64=v3` |
| `--env stable` | CI 中用于正式版构建 |

---

## 官方构建矩阵

`.github/workflows/build.yaml` 中的 `matrix` 定义了官方发布的目标组合：

| 平台 | 架构 | 备注 |
| :--- | :--- | :--- |
| Android | `arm64` / `amd64` / `arm` / `universal` | 分别对应 ARMv8 / x86_64 / ARMv7 / 通用包 |
| Windows | `amd64` / `arm64` | `amd64` 另有 `compatible: true` 构建 |
| macOS | `arm64` / `amd64` | Intel / Apple Silicon |
| Linux | `amd64` / `arm64` | `amd64` 另有 `compatible: true` 构建 |

Windows 构建还会先产出内核与 HelperService，经 SignPath 签名后再打包安装器；因此本地构建不会带有官方 OV 数字签名。

---

## 内置数据

构建脚本会从 [bett-rules](https://github.com/appshubcc/bett-rules) 的 Release 下载 `geosite.dat`、`geoip.metadb` 与 `GeoLite2-ASN-lite.mmdb` 作为内置 GEO 数据（见 `setup.dart`）；应用内「更多 → 外部资源」可查看与更新这些资源。

---

:::note 开源协议
Bettbox 采用 [GPL-3.0](https://github.com/appshubcc/Bettbox/blob/main/LICENSE) 协议。二次开发与分发请遵守协议要求。
:::
