---
sidebar_position: 11
---

# 从 FlClash 迁移

README 致谢中明确写明：**Bettbox 起源于 [FlClash](https://github.com/chen08209/FlClash)**。两者都基于 Mihomo，配置格式一致。

---

## 1. 可以保留什么

| 内容 | 说明 | 依据 |
| :--- | :--- | :--- |
| 订阅链接 | 可直接重新导入 | `lib/views/profiles/add_profile.dart` |
| Clash / Mihomo YAML 配置 | 使用同一内核配置格式 | `core/Clash.Meta/` |
| `flclash://install-config` 链接 | Android manifest 仍注册该 scheme | `AndroidManifest.xml` |
| 节点分享链接 | 节点库支持 URI / Base64 / YAML | `lib/views/profiles/nodes.dart` |

源码注册的 install-config scheme 共四个：`clash`、`clashmeta`、`flclash`、`bettbox`。

:::caution 兼容性边界
README 只说明项目起源于 FlClash，并未承诺「100% 兼容」。涉及自定义覆写脚本或平台专属选项的配置，建议导入后逐项核验。
:::

---

## 2. 迁移步骤

1. 在 FlClash 中复制订阅链接或导出配置文件。
2. 从 [Releases](https://github.com/appshubcc/Bettbox/releases/latest) 安装 Bettbox。Android 包名为 `com.appshub.bettbox`（`android/app/build.gradle.kts`），与 FlClash 不同，可同时安装。
3. 在 Bettbox 的 **配置** 页面点击 **＋**，用 URL / 文件 / 二维码 / 剪贴板导入。
4. 点击配置卡片激活，进入 **代理** 页面选择节点。
5. 重新确认「分应用代理」与后台权限设置：这是应用级设置，不会随配置文件迁移。
6. 手动同步一次订阅，确保节点为最新。

:::tip 不要同时开启两个 VPN
Bettbox 与 FlClash 都通过系统 VPN / TUN 接管流量，建议同一时间只运行其中一个，避免虚拟网卡冲突。
:::

---

## 3. 迁移后可用的增强能力

按 Release 说明与源码：

- **托管模式**：内置脚本生成代理组与规则（v1.19.8，见[托管模式](/docs/guide/managed)）
- **订阅合并**：多个订阅统一管理（v1.19.8）
- **节点库与落地节点**：导入单节点、WARP 生成 WireGuard、指定前置代理（v1.19.9）
- **应用内更新**：自动检查、下载、校验与安装（v1.19.9）
- **Android 原生桌面小组件**：三种规格（v1.19.8）
- **流量统计与 IP 风险提示**：（v1.19.8）
- **工具箱**：测速、路由追踪、DNS 查询、iPerf3、Age 加解密等（v1.19.7 起，见[工具箱](/docs/guide/toolbox)）
- **备份与恢复**：WebDAV / 本地、AES-256 备份密码（v1.19.7，见[配置与订阅](/docs/guide/config#6-备份与恢复)）
- **Lite / Standard 变体**：按需选择内核组件（v1.19.8 / v1.19.9）

---

## 4. 迁移后排障

**Q：导入后节点正常但无法测速？**  
A：到 **更多 → 外部资源** 检查 GeoSite / MMDB / ASN / MRS 状态；也可在「内核配置 → 通用」检查 `testUrl` 等设置。

**Q：配置里的 DNS 选项不见了？**  
A：当前版本已移除应用侧 DNS 覆写页面，DNS 遵循配置文件或托管脚本，详见[节点与代理组](/docs/guide/proxies#5-dns-设置的变化)。

:::note 本文源码依据
`README.md`、`android/app/build.gradle.kts`、`android/app/src/main/AndroidManifest.xml`、`lib/views/profiles/`、`lib/views/access.dart`、`arb/intl_zh_CN.arb`、v1.19.7 / v1.19.8 / v1.19.9 Release 说明。
:::
