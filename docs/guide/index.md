---
sidebar_position: 1
---

# 功能指南总览

Bettbox 的界面由**导航页面 + 设置分组 + 首页卡片 + 工具箱**组成。本页是功能地图，具体规则以源码中的导航定义与中文语言包为准。

---

## 导航结构

源码 `lib/common/navigation.dart` 定义 `Navigation.getItems()`，`PageLabel` 枚举列出所有页面。各页面的显示位置由 `modes` 决定：

| 页面（`PageLabel`） | 中文名 | 出现位置 |
| :--- | :--- | :--- |
| `dashboard` | 首页 | 移动端 / 桌面端 |
| `proxies` | 代理 | 移动端 / 桌面端（存在代理时） |
| `profiles` | 配置 | 移动端 / 桌面端 |
| `connections` | 连接 | 桌面端 / 更多 |
| `resources` | 外部资源 | 更多 |
| `script` | 覆写脚本 | 更多 |
| `toolbox` | 工具箱 | 桌面端 / 更多 |
| `logs` | 日志 | 桌面端 / 更多 |
| `tools` | 更多 | 移动端 / 桌面端 |

:::tip 找不到设置项
「更多」页面提供设置项搜索（`lib/views/tools.dart` 中的 `_query` / `_cachedSearchItems`），可直接输入名称定位；桌面的侧边栏悬浮快捷入口也可配置。
:::

---

## 设置分组

`lib/views/tools.dart` 中，「更多 → 设置」下的主要分组与入口包括：

| 分组 | 中文名 | 主要内容 |
| :--- | :--- | :--- |
| 内核配置 | 内核配置 | 全局修改内核参数，见下方子页 |
| 增强工具 | 增强工具 | 智能启停、Doze 休眠、禁用 QUIC、通知栏网速、托盘增强等 |
| 分应用代理 | 分应用代理 | 应用访问黑白名单 |
| 备份与恢复 | 备份与恢复 | WebDAV / 本地备份与恢复 |
| 应用程序 | 应用程序 | 自启动、静默启动、托盘与窗口行为、自动检查/下载更新 |
| 主题 | 主题 | 主题模式、主题色彩、字体修复、文本缩放 |
| 语言 | 语言 | 界面语言 |
| 关于 | 关于 | 版本信息、检查更新 |

另有「外部资源」「覆写脚本」「工具箱」「快捷键管理」「回环解锁」「声明」「开发者模式」等独立入口，具体以当前平台界面为准。

### 内核配置子页

`lib/views/config/config.dart` 中「内核配置」包含六个子页：

1. 通用
2. 网络
3. NTP
4. Sniffer
5. Tunnel
6. 实验性

:::caution DNS 覆写页面已移除
v1.19.8 Release 说明写明「完整移除原 DNS 覆写页面选项」；v1.19.9 进一步写明「完整移除应用侧默认 DNS 配置覆写与覆写规则集自动注入，完全遵循配置文件或托管脚本的 DNS 设置」。因此内核配置中**不再有独立的 DNS 覆写页**。DNS 由配置文件或[托管模式](/docs/guide/managed)脚本决定。
:::

---

## 功能地图

| 想做的事 | 页面 |
| :--- | :--- |
| 导入、更新、备份配置 | [配置与订阅](/docs/guide/config) |
| 代理组、测速、规则、DNS、节点库 | [节点与代理组](/docs/guide/proxies) |
| 用内置脚本生成代理组与规则 | [托管模式](/docs/guide/managed) |
| 让指定 App 进入或绕过 VPN | [分应用代理](/docs/guide/apps) |
| 首页卡片、Android 桌面小组件、主题、脚本 UI | [首页与小组件](/docs/guide/widgets) |
| 网络与 DNS 调试 | [工具箱](/docs/guide/toolbox) |
| 检查与安装更新 | [应用更新](/docs/guide/updates) |

---

## 能力来源

- **内核**：`core/Clash.Meta/` 内置 Mihomo；出站实现包含 Shadowsocks、ShadowsocksR、VMess、VLESS、Trojan、Hysteria、Hysteria2、TUIC、WireGuard、SSH、AnyTLS、Mieru、Snell、HTTP、SOCKS5、ShadowTLS、Masque、TrustTunnel、Sudoku、OpenVPN、EasyTier、Tailscale、Zerotier 等文件（部分仅 Standard 变体包含）。
- **编辑器**：`plugins/code_forge`，README 称其为高性能 Code-forge 编辑器。
- **图标**：v1.19.9 Release 说明引入 Phosphor 图标包，Android 端默认开启。

:::note 本文源码依据
`lib/common/navigation.dart`、`lib/enum/enum.dart`（`PageLabel`、`RuleAction`）、`lib/views/tools.dart`、`lib/views/config/config.dart`、`README.md`、v1.19.7 / v1.19.8 / v1.19.9 Release 说明、`core/Clash.Meta/adapter/outbound/`。
:::
