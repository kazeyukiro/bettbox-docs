---
sidebar_position: 2
---

# 快速开始

本页带你完成 **下载 → 安装 → 导入订阅 → 开启代理** 的完整首次体验。全文以 GitHub Releases 为唯一官方下载源。

:::caution 仅从官方渠道获取
Bettbox 的所有安装包均在 [GitHub Releases](https://github.com/appshubcc/Bettbox/releases/latest) 发布。请勿从不明第三方站点下载，以免引入被篡改的构建。
:::

---

## 1. 下载安装包

前往官方 [Releases](https://github.com/appshubcc/Bettbox/releases/latest) 页面，按你的平台与架构选择对应包：

| 平台 | 系统要求 | 推荐包 | 兼容提示 |
| :--- | :--- | :--- | :--- |
| **Android** | 8.0+ | `Bettbox-Android-universal-*.apk` | 低内存设备选 ARMv7 32 位 |
| **Android TV** | 已适配 | 与手机共用 Android APK（无独立 TV 版） | 低内存设备选 ARMv7 |
| **Windows** | 8.1+ | `Bettbox-windows-x64-setup.exe` | 旧 CPU 用 `*-compatible-*` |
| **macOS** | 10.15+ | `Bettbox-macos-*.dmg` | Intel / Apple Silicon 分开 |
| **Linux** | Kernel 5.4+ | `.AppImage` / `.deb` / `.rpm` | 旧 CPU 用兼容版 |

### 其他安装方式

- **Arch Linux**：`yay -S bettbox-bin` 或 `paru -S bettbox-bin`（由 [lyj404](https://github.com/lyj404/bettbox-aur) 维护）
- **AMD64=v1 兼容版**：`yay -S bettbox-compatible-bin` 或 `paru -S bettbox-compatible-bin`（由 [VillagerTom](https://github.com/VillagerTom) 维护）
- **鸿蒙 NEXT**：配合 [卓易通](https://harmonyos.cool/android-app) 稳定使用

---

## 2. 各平台安装注意事项

### Windows

- 安装版已预先处理权限，**一般无需**再以管理员身份运行。
- 若无法开启 TUN，请确认没有其他代理软件 / VPN 占用虚拟网卡。

### macOS

1. 下载对应架构的 `.dmg`，将 Bettbox 图标拖入「应用程序」。
2. 若被 Gatekeeper 拦截（当前暂未购买 Apple 开发者证书）：
   - **推荐**：在「应用程序」中**右键 → 打开**，在确认弹窗中再次点击「打开」。
   - **备选**：「系统设置 → 隐私与安全性」中找到 Bettbox，点击「仍要打开」。
3. 首次开启 TUN 时，输入当前登录用户的密码以授权网络配置。

### Android / Android TV

- 授予必要后台权限，满足最低系统要求 Android 8.0+。
- 低内存设备可选用 ARMv7 32 位包。
- 部分厂商需手动关闭电池优化以保证后台保活。

### Linux

- 开启 TUN 时需输入密码完成权限授权。
- `.AppImage` 需要可执行权限：`chmod +x Bettbox-*.AppImage`。

---

## 3. 导入订阅

Bettbox 提供多种导入方式，最推荐 **URL 自动同步**。

1. 打开应用，进入底部导航栏的 **配置** 页面。
2. 点击右下角的 **＋** 按钮，选择你需要的导入方式：
   - **从 URL 导入**：粘贴订阅链接，支持设置自动更新间隔。
   - **从文件导入**：选择本地 `.yaml` 配置文件。
   - **扫描二维码**：直接扫码，或从相册识别二维码图片。
3. 在列表中点击该配置卡片，确认其处于选中（激活）状态。

:::tip 订阅无法解析？
先在浏览器中验证链接是否可访问；若链接带订阅转换/加密，请确认格式为标准的 Clash / Mihomo 格式。详见 [配置订阅指南](/docs/guide/config)。
:::

---

## 4. 开启代理

- **桌面端**：可开启 **系统代理** 或 **TUN** 模式。
- **移动端**：使用 **VPN / TUN** 模式。
- 在 **代理（Proxies）** 页面选择节点，必要时执行延迟测试（点击测速按钮）。
- 规则分流、DNS、脚本适配等进阶玩法见 [功能指南](/docs/guide)。

---

## 5. 下一步

| 你想做 | 去哪里 |
| :--- | :--- |
| 管理/自动更新订阅、WebDAV 备份 | [配置订阅指南](/docs/guide/config) |
| 理解代理组、测速、TUN、规则 | [节点与代理组](/docs/guide/proxies) |
| 让某 App 走代理、某 App 直连 | [应用分流](/docs/guide/apps) |
| 更换主题/图标、用 APP首页实时网速小组件 | [小组件与个性化](/docs/guide/widgets) |
| 排障安装/权限/订阅问题 | [常见问题](/docs/faq) |
