---
sidebar_position: 10
---

# 常见问题

以下答案均来自源码、README 或 Release 说明；没有源码依据的通用说法已删除。

---

## 安装与兼容

**Q：Android 最低版本是多少？**  
A：**Android 7.0+**。`README.md` 标注 Android 7.0+，`android/app/build.gradle.kts` 中 `minSdk = 24`；v1.19.9 发布说明写明由 8.0 下调至 7.0。

**Q：macOS 最低版本？**  
A：**macOS 12.0+**，Xcode 工程多处 `MACOSX_DEPLOYMENT_TARGET = 12.0`。

**Q：需要 Easytier / Tailscale / Zerotier，该下哪个包？**  
A：带 **`-standard`** 后缀的包。v1.19.9 明确提示默认包改为 Lite，不含这些组件；Lite 的构建标签为 `no_easytier,no_tailscale,no_zerotier,no_fake_tcp,with_low_memory`。

**Q：旧电脑运行异常？**  
A：尝试 **Compatible** 兼容版（Windows / Linux amd64）。代码中标准包 `GOAMD64=v3`，兼容版 `v1`。

**Q：从哪里下载？**  
A：[GitHub Releases](https://github.com/appshubcc/Bettbox/releases/latest)。README 只给出此下载源。

**Q：Windows 签名情况？**  
A：README 写明通过 SignPath 开源基金会人工审核溯源，Windows 版使用 OV 代码签名证书；但 v1.19.6 Release 说明曾提到因 Google 账号原因临时禁用签名流程。以实际安装包签名状态为准。

---

## 权限与网络

**Q：无法开启 TUN？**  
A：macOS / Linux 按系统提示输入密码授权；同时排查其他代理软件 / VPN 是否占用虚拟网卡或端口。Android 需授予 VPN 权限并保持后台运行。

**Q：安卓后台经常断连？**  
A：检查是否授予充足后台权限，部分厂商需关闭电池优化、允许自启动；「更多 → 设置 → 增强工具」中有电池优化白名单请求入口（`batteryOptimizationDesc`）。

**Q：修改分应用代理后没生效？**  
A：界面提示 `restartTip` / `vpnTip`，需重启 TUN 或 VPN 服务。

---

## 订阅与配置

**Q：导入订阅失败？**  
A：中文文案 `profileImportFailed` 提示检查网络状况或尝试重置订阅链接。若使用 Age 加密订阅，检查私钥是否以 `AGE-SECRET-KEY-` 开头且配对正确（`ageSecretKeyInvalidValidationDesc`）。

**Q：自动更新间隔填 hours 还是 minutes？**  
A：**分钟**。字段名为「自动更新间隔（分钟）」（`autoUpdateInterval`）。12 小时填 `720`，24 小时填 `1440`。

**Q：手工改的配置被自动更新覆盖？**  
A：应用会提示 `profileHasUpdate` 询问是否关闭自动更新；也可改用「覆写」附加自定义规则。v1.19.8 起覆写仅支持附加模式。

**Q：DNS 设置去哪了？**  
A：v1.19.8 移除了 DNS 覆写页面；v1.19.9 完全移除应用侧默认 DNS 配置覆写与覆写规则集自动注入。DNS 现在由配置文件或[托管模式](/docs/guide/managed)脚本决定，详见[节点与代理组](/docs/guide/proxies#5-dns-设置的变化)。

**Q：测速无响应 / 规则集不生效？**  
A：到 **更多 → 外部资源** 检查 GeoSite、MMDB、ASN、MRS 的状态与更新时间。

**Q：Age 加密和 AES-256 是什么关系？**  
A：订阅加密使用 **Age**（X25519 / 后量子混合），AES-256 仅用于**备份文件密码**（`backupPasswordDesc`）。两者用途不同。

---

## 功能位置

**Q：找不到「应用分流」「DNS 设置」？**  
A：界面名称是「**分应用代理**」；DNS 已无独立覆写页。「更多」页面顶部提供设置项搜索，可直接输入名称定位。

**Q：首页小组件能放到桌面吗？**  
A：要分清两类：
- **首页卡片**：App 内首页的可自定义卡片，不能放到系统桌面。
- **Android 系统桌面小组件**：v1.19.8 新增，有「订阅 · 大号 / 宽条 / 方块」三种规格，可在桌面添加。

其他平台没有原生桌面小组件。详见[首页与小组件](/docs/guide/widgets#2-android-系统桌面小组件)。

**Q：怎么更新应用？**  
A：「更多 → 关于 → 检查更新」，或在「更多 → 设置 → 应用程序」开启自动检查 / 自动下载。便携版不支持应用内下载更新，见[应用更新](/docs/guide/updates)。

---

## 反馈

提交 Issue 请附**复现步骤、版本与系统信息、Debug 日志**：[GitHub Issues](https://github.com/appshubcc/Bettbox/issues)。社区渠道见[交流与反馈](/docs/contact)。

:::note 本文源码依据
`README.md`、`android/app/build.gradle.kts`、`macos/Runner.xcodeproj/project.pbxproj`、`lib/views/backup_and_recovery.dart`、`lib/views/access.dart`、`lib/views/tools.dart`、`lib/common/updater.dart`、`arb/intl_zh_CN.arb`、v1.19.6 / v1.19.8 / v1.19.9 Release 说明。
:::
