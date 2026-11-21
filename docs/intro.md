---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Bettbox 是什么

<p align="center">
  <img alt="Bettbox 主界面" src={useBaseUrl('/img/docs-home.png')} width="720" />
</p>

**Bettbox** 是一款基于 **Mihomo** 内核的多平台网络分流与 DNS 调试工具。项目定位为「更专注于极致的用户体验，为长期稳定运行而生，轻量省资源，且不收集任何数据」。

> 项目口号：**Another Better Network Toolbox**。Bettbox 取自 **Better Network Toolbox**。

---

## 项目出身

- 内核使用 [Mihomo](https://github.com/MetaCubeX/mihomo)，源码内置于 `core/Clash.Meta/`。
- 项目**起源于 [FlClash](https://github.com/chen08209/FlClash)**。
- 采用 [GPL-3.0](https://github.com/appshubcc/Bettbox/blob/main/LICENSE) 开源协议，无广告，不收集数据。
- 项目已通过 SignPath 开源基金会人工审核安全溯源，Windows 版使用 OV 代码签名证书；v1.19.6 期间曾因 Google 账号原因临时禁用 Windows 签名流程，具体以所下载版本的实际签名为准。

---

## 支持平台

| 平台 | 要求 | 架构 / 说明 |
| :--- | :--- | :--- |
| Android | **7.0+** | ARMv8 / ARMv7 / x86_64 / Universal；Android TV 为完整大屏适配 |
| Windows | 8.1+ | x64 / arm64；旧 CPU 可用 Compatible |
| macOS | **12.0+** | Intel / Apple Silicon |
| Linux | Kernel 5.4+ | x64 / arm64；旧 CPU 可用 Compatible |
| 鸿蒙 NEXT | 通过[卓易通](https://harmonyos.cool/android-app)使用 | 复用 Android 应用 |

:::caution Android 最低版本
Android 最低支持版本为 7.0（v1.19.9 起由 8.0 下调）。旧版本发布页中的 Android 8.0+ 要求已不再适用。
:::

### Lite 与 Standard 变体

从 v1.19.8 起提供两个内核变体，v1.19.9 起**默认产物改为 Lite**，完整版需选择带 `-standard` 后缀的包：

| 变体 | 构建参数 | 内核构建标签 | 说明 |
| :--- | :--- | :--- | :--- |
| **Lite（默认）** | 不加 `--standard` | `no_easytier,no_tailscale,no_zerotier,no_fake_tcp,with_low_memory` | 不含 EasyTier / Tailscale / Zerotier / fake-tcp / gVisor 相关能力 |
| **Standard** | `--standard` | `with_gvisor` | 包含上述组件；Android `armeabi-v7a` 额外带 `with_low_memory` |

需要使用 **Easytier、Tailscale、Zerotier** 等协议时，必须下载带 `-standard` 后缀的版本。

### Compatible 兼容版

面向 2012 年前后及更早的 CPU。Windows / Linux 的 amd64 标准包以 `GOAMD64=v3` 编译，兼容版改用 `v1`；macOS 的 amd64 固定为 `v1`。兼容版仅提供 **Windows / Linux 的 amd64**。

---

## 能做什么

- **流量接管**：TUN 虚拟网卡、系统代理、Android VPN 服务；桌面端托盘快捷控制代理组。
- **规则分流**：Mihomo 规则引擎，支持域名、GeoIP、进程等匹配维度。
- **订阅管理**：URL / 文件 / 二维码 / 剪贴板导入，自动更新，订阅合并，Age 加密订阅，WebDAV / 本地备份。
- **托管模式**：使用内置脚本生成代理组与规则，可配置地区分组、服务、路由与规则集（见[托管模式](/docs/guide/managed)）。
- **节点库**：导入单节点、注册 Cloudflare WARP 生成 WireGuard 落地节点、指定前置代理并注入配置（见[节点与代理组](/docs/guide/proxies)）。
- **首页与桌面小组件**：首页卡片可自定义；Android 另有三种规格的系统桌面小组件（见[首页与小组件](/docs/guide/widgets)）。
- **工具箱**：测速、路由追踪、DNS 查询、NAT 检测、iPerf3、流量统计、Age 加解密等（见[工具箱](/docs/guide/toolbox)）。
- **应用内更新**：自动检查、后台下载、SHA-256 校验、断点续传与覆盖安装（见[应用更新](/docs/guide/updates)）。
- **脚本与编辑器**：外置 JS 覆写脚本可声明可视化开关；内置 code-forge 编辑器。

---

## 文档导航

| 页面 | 内容 |
| :--- | :--- |
| [快速开始](/docs/getting-started) | 下载、安装、导入订阅、开启代理 |
| [功能指南](/docs/guide) | 功能地图与导航结构 |
| [配置与订阅](/docs/guide/config) | 订阅导入、更新、备份、配置编辑 |
| [节点与代理组](/docs/guide/proxies) | 代理组、测速、规则、DNS、节点库 |
| [托管模式](/docs/guide/managed) | 内置脚本、规则集、覆写规则 |
| [分应用代理](/docs/guide/apps) | 应用黑白名单 |
| [首页与小组件](/docs/guide/widgets) | 首页卡片、桌面小组件、主题、脚本 UI |
| [工具箱](/docs/guide/toolbox) | 网络与 DNS 调试工具 |
| [应用更新](/docs/guide/updates) | 更新设置与版本选择 |
| [从源码构建](/docs/development) | 依赖、命令、构建矩阵 |
| [迁移指南](/docs/migration) | 从 FlClash 切换 |
| [常见问题](/docs/faq) | 排障 |
| [交流与反馈](/docs/contact) | 官方社区与 Issue |

---

## 官方资源

- 源码与 Releases：[github.com/appshubcc/Bettbox](https://github.com/appshubcc/Bettbox)
- Telegram 交流群：[t.me/bettbox_chat](https://t.me/bettbox_chat)
- Telegram 频道：[t.me/appshub_channel](https://t.me/appshub_channel)
