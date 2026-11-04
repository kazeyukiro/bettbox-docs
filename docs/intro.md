---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 欢迎使用 Bettbox

<p align="center">
  <img alt="Bettbox 主界面" src={useBaseUrl('/img/docs-home.png')} width="720" />
</p>

**Bettbox** 是一款多平台的网络分流与 DNS 调试工具，基于强大的 **Mihomo（Clash Meta）** 内核深度打造。项目起源于开源项目 [FlClash](https://github.com/chen08209/FlClash)，在继承其界面与交互的基础上，对细节、性能与多平台体验做了大量打磨。

> **Another Better Network Toolbox** —— Bettbox 意为 **Better Network Toolbox**（更好的网络工具箱）。

---

## 它解决什么问题

- **开箱即用**：预置了稳定的权限处理与舒适的 TUN / VPN 体验，大量优化细节让软件在首次安装后即可达到可用状态，减少繁琐的手动调试。
- **前台流畅、后台省电**：移动端低能耗、桌面端低占用，以少量资源消耗即可长期稳定运行。
- **安全透明**：开源（GPL-3.0）、无广告、无隐私收集，CI/CD 流程全透明可审计；已通过 [SignPath](https://signpath.io) 开源基金会人工安全溯源，Windows 端装载 OV 数字签名。

---

## 支持平台

| 平台 | 系统要求 | 架构 |
| :--- | :--- | :--- |
| **Android** | 8.0+ | ARMv8 / ARMv7 / x86_64 / Universal |
| **Android TV** | 已适配（共用 Android APK，无独立 TV 版） | 低内存设备可选 ARMv7 32 位 |
| **Windows** | 8.1+ | x64 / arm64（旧 CPU 请用 Compatible 版） |
| **macOS** | 12.0+ | Intel / Apple Silicon |
| **Linux** | Kernel 5.4+ | x64 / arm64（旧 CPU 请用 Compatible 版） |
| **鸿蒙 NEXT** | 配合 [卓易通](https://harmonyos.cool/android-app) 使用 | — |

:::info 关于 macOS 版本
macOS 工程的最低部署目标为 **12.0**（`macos/Runner.xcodeproj/project.pbxproj` 中的 `MACOSX_DEPLOYMENT_TARGET = 12.0`），官方 README 也标注为 macOS 12.0+。低于 12.0 的系统不受支持。
:::

:::tip 关于 Compatible 兼容版
面向 2012 年前后及更早 CPU 等设备，Bettbox 持续维护 **Compatible** 兼容版本。标准桌面包以 `GOAMD64=v3` 编译，兼容版降到 `GOAMD64=v1`（见 `setup.dart`）；构建矩阵中 Compatible 仅针对 **Windows / Linux 的 amd64（x64）** 提供。若标准包在旧设备上运行异常，请尝试兼容版。
:::

---

## 核心特性

- **开箱即用**：稳定的权限处理与舒适的 TUN/VPN 体验，大量预置优化细节，开箱即达可用状态。
- **精雕细琢**：打磨每处 UI 与功能交互细节，前台高帧率动画流畅，移动端低能耗，桌面端低占用。
- **安全守护**：内核紧跟 Mihomo 主线，遵循各平台最小权限，并获得 SignPath 官方 OV 数字签名。
- **稳定容错**：优化多平台极端场景下的边界问题，内置**双重配置检测验证**，媲美企业级稳定性。
- **性能优先**：桌面端原生 ARM64 架构支持，提供硬件分级与 Flutter 深度优化，榨干硬件性能。
- **增强工具**：多平台无感智能启停、Android 端 Doze 休眠支持、一键禁用 QUIC、托盘菜单控制代理组等。
- **可视化设置**：提供更丰富的参数可视化调节界面，改动即时生效，无需繁琐修改 YAML。
- **APP首页实时网速小组件**：内置多款设计精良的 Widget，在 App 首页直观掌控实时网速与全局运行状态。
- **全能工具箱**：内置网速测试、路由追踪、DNS 查询、NAT 检测、IP 全能查、iPerf3、Age 加解密等网络诊断工具，详见 [工具箱](/docs/guide/toolbox)。
- **个性化定制**：支持丰富的色彩主题、自定义图标/标题，甚至还包含 **30 种精美测速动画**。
- **自定义适配**：支持 JS 覆写脚本分流 UI 适配，以及自定义的可视化便捷开关。
- **专业编辑**：多平台内置高性能重构版 **code-forge** 编辑器，体验可媲美专业级编辑器。
- **设备兼容**：持续维护面向旧版系统及老旧硬件的 Compatible 兼容版本。
- **零隐私风险**：开源、无广告，全透明 CI/CD 流程接受全方位审计。
- **社区导向**：认真评估社区反馈，优先对待高质量的 Issue。

---

## 与 FlClash 的关系

Bettbox **起源于 FlClash**（官方 README 致谢中明确说明），两者同基于 Mihomo 内核、使用相同的 Clash/Mihomo 配置格式，导入、测速、切换节点的交互逻辑一脉相承，因此绝大多数 FlClash 配置可以直接迁移使用。源码中也保留了兼容痕迹：Android 端仍注册 `flclash://install-config` 深度链接，内核默认 UA 沿用 `FlClash/ClashMetaForAndroid/2.11.33.Bettbox`。

在此之上，Bettbox 针对功耗、内核预调优与多平台实用功能做了深度增强。详见 [迁移指南](/docs/migration)。

---

## 文档导航

- [🚀 快速开始](/docs/getting-started) — 下载安装、导入订阅、首次配置
- [🔧 功能指南](/docs/guide) — 配置订阅、节点代理、分应用代理、小组件与个性化
- [🧰 工具箱](/docs/guide/toolbox) — 内置网络与 DNS 调试工具
- [🛠️ 从源码构建](/docs/development) — 依赖环境与构建命令
- [🔄 迁移指南](/docs/migration) — 从 FlClash 平滑切换
- [❓ 常见问题](/docs/faq) — 安装、权限、订阅排障
- [💬 交流与反馈](/docs/contact) — Telegram / GitHub Issues

---

## 官方资源

- 源码与 Releases：[github.com/appshubcc/Bettbox](https://github.com/appshubcc/Bettbox)
- Telegram 交流群：[t.me/appshub_chat](https://t.me/appshub_chat)
- Telegram 频道：[t.me/appshub_channel](https://t.me/appshub_channel)

:::note 文档依据
本页及系列文档中的功能名称、界面入口、平台要求与命令，均以 [Bettbox 源码仓库](https://github.com/appshubcc/Bettbox)的 README、源码与 Release 说明为准校对；界面名称以简体中文语言包 `arb/intl_zh_CN.arb` 为准。例如官方名称含义「Better Network Toolbox」亦见于 v1.19.7 Release 说明中的「新的 Slogan：Better Network Toolbox」。
:::
