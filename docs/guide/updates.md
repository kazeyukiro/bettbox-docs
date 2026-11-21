---
sidebar_position: 8
---

# 应用更新

v1.19.9 引入应用内更新下载与覆盖安装。以前版本仍可通过 Releases 手动更新。

---

## 1. 更新入口

- **更多 → 关于**：提供「检查更新」按钮（`lib/views/about.dart` 调用 `checkUpdateResultHandle`）。
- **更多 → 设置 → 应用程序**：
  - 自动检查更新（`autoCheckUpdate`）：应用启动时自动检查更新。
  - 自动下载更新（`autoDownloadUpdate`）：发现新版本后在后台自动下载。

`AppUpdateStatus` 枚举有三个状态：`available`、`downloading`、`ready`。仪表盘标题栏会显示更新进度与状态角标（v1.19.9 Release 说明）。

---

## 2. 下载与校验

`lib/common/updater.dart`  internals：

- 检查地址：`https://github.com/{repository}/releases/latest`，更新包来自对应 Release 资源。
- 资源名格式：`Bettbox-<版本>-<构建注入的 APP_ASSET_SUFFIX>`。
- 校验文件：`sha256sums.txt`，下载后计算 SHA-256 比对。
- 断点续传：临时文件为 `.part`，续传时带 `Range: bytes=<offset>-` 请求头。
- `isSupported` 条件：构建时注入了 `APP_ASSET_SUFFIX` 且不是 portable 便携版。

:::caution 便携版
便携安装不会启用应用内下载更新（`isSupported` 为 false），请从 Releases 手动更新。
:::

下载失败时提示 `updateDownloadFailed`，安装失败时提示 `updateInstallFailed`。

---

## 3. 安装过程

- 安装包下载完成后进入 `ready` 状态，点击安装会先确认。
- 若 VPN 正在运行：`updateReadyVpnTip` 提示升级前会主动关闭 VPN 服务。
- 桌面端：`updateReadyAppTip` 提示会先关闭应用。
- v1.19.9 Release 说明：安装失败时会自动恢复服务状态；支持 Android、Windows、macOS、Linux 四端应用内一键升级。

---

## 4. 选对版本

更新前请确认自己使用的是 **Lite** 还是 **Standard**、标准版还是 **Compatible**：

- 需要 Easytier / Tailscale / Zerotier 等协议时，选带 `-standard` 后缀的包（v1.19.9 Release 说明）。
- 旧 CPU 用 `-compatible`，仅 Windows / Linux amd64 提供。
- 版本后缀说明见[介绍](/docs/intro#lite-与-standard-变体)。

:::note 本文源码依据
`lib/common/updater.dart`、`lib/controller.dart`、`lib/views/about.dart`、`lib/views/application_setting.dart`、`lib/enum/enum.dart`（`AppUpdateStatus`）、`arb/intl_zh_CN.arb`、v1.19.9 Release 说明。
:::
