---
sidebar_position: 2
---

# 快速开始

本页带你完成 **选择安装包 → 安装 → 导入订阅 → 开启代理**。下载源以官方 GitHub Releases 为准。

:::caution 仅从官方渠道获取
README 的下载入口是 [GitHub Releases](https://github.com/appshubcc/Bettbox/releases)。请勿使用来源不明的第三方安装包。
:::

---

## 1. 选择安装包

进入 [Releases](https://github.com/appshubcc/Bettbox/releases/latest)，按平台选择：

| 平台 | 要求 | 常见安装包 | 依据 |
| :--- | :--- | :--- | :--- |
| Android | 7.0+ | `Bettbox-*-android-arm64-v8a.apk`、`-x86_64.apk`、`-armeabi-v7a.apk`、`-universal.apk` | README；Release 资源列表 |
| Windows | 8.1+ | `*-windows-amd64-setup.exe`、`*-windows-arm64-setup.exe` | Release 资源列表 |
| macOS | 12.0+ | `*-macos-arm64.dmg`、`*-macos-amd64.dmg` | README；Release 资源列表 |
| Linux | Kernel 5.4+ | `.AppImage` / `.deb` / `.rpm`，x64 与 arm64 | Release 资源列表 |
| 鸿蒙 NEXT | 通过卓易通运行 Android 应用 | 复用 Android APK | README |

### 版本后缀怎么看

Release 资源名称由构建矩阵生成（`.github/workflows/build.yaml`）：

- `-compatible`：旧 CPU 兼容版，仅 Windows / Linux 的 amd64。
- `-standard`：完整内核版，包含 EasyTier / Tailscale / Zerotier / gVisor 等；**默认包是 Lite**。
- 两个后缀可同时出现，例如 Windows amd64 的 compatible + standard 组合。

v1.19.9 Release 说明明确：需要 Easytier、Tailscale、Zerotier 等协议时，务必下载带 `-standard` 后缀的版本。

### 其他安装方式

README 列出 Arch Linux 社区包：

```bash
yay -S bettbox-bin       # 或 paru -S bettbox-bin
yay -S bettbox-compatible-bin
```

---

## 2. 安装注意事项

### Windows

README：管理员权限相关处理已内置在安装包中，日常使用一般无需再次手动提权。开启 TUN 前请确认没有其他代理工具占用端口或虚拟网卡。

### macOS

README 给出的步骤：

1. 按芯片下载对应 `.dmg`，拖入「应用程序」。
2. 因当前未购买 Apple 商业开发者证书，可能被 Gatekeeper 拦截：
   - 推荐：在「访达 → 应用程序」中**右键点击 Bettbox → 打开**，在弹窗中再点「打开」。
   - 备选：进入「系统设置 → 隐私与安全性」，找到 Bettbox 点击「仍要打开」。
3. 首次开启 TUN 时输入系统密码，允许创建虚拟网络接口。

### Android / Android TV

- 最低 Android 7.0（`minSdk = 24`）。
- 授予充足的后台运行权限；部分厂商需关闭电池优化、允许自启动。
- Android TV 为完整大屏适配；低内存设备可选 ARMv7 32 位包。
- TV 可用「扫码 / 局域网导入」：手机扫码或在浏览器里粘贴订阅链接、上传配置后推送到电视，对应 `lib/views/profiles/tv_qr_import_dialog.dart`。

### Linux

- 开启 TUN 时按系统提示输入密码授权。
- `.AppImage` 需先赋予可执行权限：

```bash
chmod +x Bettbox-*.AppImage
```

---

## 3. 导入订阅

入口：底部导航的 **配置** 页面 → 右下角 **＋**。源码 `lib/views/profiles/add_profile.dart` 提供四种方式：

| 方式 | 界面文案 | 说明 |
| :--- | :--- | :--- |
| URL | URL | 粘贴订阅链接，可在随后打开的配置页设置名称、自动更新间隔（分钟）、Age 私钥 |
| 剪贴板 | 剪贴板 | 自动读取剪贴板中的订阅链接（`clipboardDesc`） |
| 文件 | 文件 | 选择本地配置文件 |
| 二维码 | 二维码 | 移动端扫码；桌面端上传二维码图片（`pleaseUploadValidQrcode`） |

导入后点击配置卡片使其处于选中状态，即激活该配置。

:::tip 加密订阅
若订阅由 Age 公钥加密，需要在配置页填写以 `AGE-SECRET-KEY-` 开头的私钥。私钥可通过配置编辑页的钥匙按钮生成，也可在「更多 → 工具箱 → Age 加解密」中生成。详见[配置与订阅](/docs/guide/config)。
:::

:::tip 从链接直接导入
Android 端注册了 `clash://install-config`、`clashmeta://install-config`、`flclash://install-config`、`bettbox://install-config` 四种 scheme（`AndroidManifest.xml`），点击兼容的订阅安装链接可唤起 Bettbox。
:::

---

## 4. 开启代理

- **桌面端**：可开启**系统代理**或**虚拟网卡（TUN）**；首页也有对应快捷开关卡片。
- **Android**：通过 VpnService 接管流量；首页提供 VPN 按钮卡片。
- 进入 **代理** 页面选择节点，可执行延迟测试。

更多分流、DNS、节点注入方式见[节点与代理组](/docs/guide/proxies)。

---

## 5. 下一步

| 想做的事 | 去哪里 |
| :--- | :--- |
| 自动更新、备份、编辑配置 | [配置与订阅](/docs/guide/config) |
| 代理组、规则、DNS、节点库 | [节点与代理组](/docs/guide/proxies) |
| 用内置脚本生成代理组与规则 | [托管模式](/docs/guide/managed) |
| 指定 App 走代理或直连 | [分应用代理](/docs/guide/apps) |
| 首页卡片 / Android 桌面小组件 | [首页与小组件](/docs/guide/widgets) |
| 测速、DNS 查询、流量统计 | [工具箱](/docs/guide/toolbox) |
| 应用内升级 | [应用更新](/docs/guide/updates) |
| 本地编译 | [从源码构建](/docs/development) |
| 排障 | [常见问题](/docs/faq) |

:::note 本文源码依据
`README.md`、v1.19.9 Release 说明、`android/app/build.gradle.kts`、`android/app/src/main/AndroidManifest.xml`、`setup.dart`、`.github/workflows/build.yaml`、`lib/views/profiles/add_profile.dart`、`lib/views/profiles/tv_qr_import_dialog.dart`、`arb/intl_zh_CN.arb`。
:::
