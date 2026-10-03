---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 欢迎使用 Bettbox

<p align="center">
  <img alt="Bettbox 主界面" src={useBaseUrl('/img/docs-home.png')} width="720" />
</p>

**Bettbox** 是一款多平台的网络分流与 DNS 调试工具，基于强大的 **Mihomo（Clash Meta）** 内核深度打造。它从 [FlClash](https://github.com/chen08209/FlClash) 早期版本重构而来，在继承其优秀界面与交互的基础上，对细节、性能与多平台体验做了大量打磨。

> **Better Experience, Out of the box** —— 更好的体验，亦开箱可用。

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
| **Android TV** | 已完整适配 | 低内存设备可选 ARMv7 32 位 |
| **Windows** | 8.1+ | x64 / arm64（旧 CPU 请用 Compatible 版） |
| **macOS** | 10.15+ | Intel / Apple Silicon |
| **Linux** | Kernel 5.4+ | x64 / arm64（旧 CPU 请用 Compatible 版） |
| **鸿蒙 NEXT** | 配合 [卓易通](https://harmonyos.cool/android-app) 使用 | — |

:::tip 关于 Compatible 兼容版
面向 2012 年前后及更早 CPU（如 AMD v1 架构）等设备，Bettbox 持续维护 **Compatible** 兼容版本，延长老硬件的使用周期。若标准包在您的旧设备上运行异常，请尝试兼容版。
:::

---

## 核心特性

- **开箱即用**：稳定的权限处理与舒适的 TUN/VPN 体验，大量预置优化细节，开箱即达可用状态。
- **精雕细琢**：打磨每处 UI 与功能交互细节，前台高帧率动画流畅，移动端低能耗，桌面端低占用。
- **安全守护**：内核紧跟 Mihomo 主线，遵循各平台最小权限，并获得 SignPath 官方 OV 数字签名。
- **稳定容错**：优化多平台极端场景下的边界问题，内置**双重配置检测验证**，媲美企业级稳定性。
- **性能优先**：桌面端原生 ARM64 架构支持，提供硬件分级与 Flutter 深度优化，榨干硬件性能。
- **增强工具**：首个多平台无感智能启停、Android 端休眠支持、一键禁用 QUIC、托盘菜单增强等。
- **可视化设置**：提供更丰富的参数可视化调节界面，改动即时生效，无需繁琐修改 YAML。
- **首页小组件**：内置多款设计精良的 Widget，在桌面/锁屏直观掌控实时网速与全局运行状态。
- **个性化定制**：支持丰富的色彩主题、自定义图标/标题，甚至还包含 **30 种精美测速动画**。
- **自定义适配**：首个支持 JS 覆写脚本分流 UI 适配，以及自定义的可视化便捷开关。
- **专业编辑**：多平台内置高性能重构版 **code-forge** 编辑器，体验可媲美专业级编辑器。
- **设备兼容**：持续维护面向旧版系统及老旧硬件的 Compatible 兼容版本。
- **零隐私风险**：开源、无广告，全透明 CI/CD 流程接受全方位审计。
- **社区导向**：认真评估社区反馈，优先对待高质量的 Issue。

---

## 与 FlClash 的关系

Bettbox 是 FlClash 的 Fork，两者**配置格式 100% 兼容**：所有在 FlClash 上能运行的配置文件，在 Bettbox 上均可直接使用，导入、测速、切换节点的逻辑完全一致。在此之上，Bettbox 针对功耗、内核预调优与多平台实用功能做了深度增强。详见 [迁移指南](/docs/migration)。

---

## 文档导航

- [🚀 快速开始](/docs/getting-started) — 下载安装、导入订阅、首次配置
- [🔧 功能指南](/docs/guide) — 配置订阅、节点代理、应用分流、小组件与个性化
- [🔄 迁移指南](/docs/migration) — 从 FlClash 平滑切换
- [❓ 常见问题](/docs/faq) — 安装、权限、订阅排障
- [💬 交流与反馈](/docs/contact) — Telegram / GitHub Issues

---

## 官方资源

- 源码与 Releases：[github.com/appshubcc/Bettbox](https://github.com/appshubcc/Bettbox)
- Telegram 交流群：[t.me/appshub_chat](https://t.me/appshub_chat)
- Telegram 频道：[t.me/appshub_channel](https://t.me/appshub_channel)
