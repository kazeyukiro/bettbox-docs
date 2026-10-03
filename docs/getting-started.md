---
sidebar_position: 2
---

# 快速开始

## 1. 下载安装包

请前往官方 [Releases](https://github.com/appshubcc/Bettbox/releases/latest) 页面，选择与您系统匹配的安装包。

| 平台 | 系统要求 | 说明 |
|------|----------|------|
| **Android** | 8.0+ | ARMv8 / ARMv7 / Universal；兼容 Android TV |
| **Windows** | 8.1+ | x64 / arm64；2012 年及更早 CPU 请用 **Compatible** |
| **macOS** | 10.15+ | Intel / Apple Silicon |
| **Linux** | Kernel 5.4+ | x64 / arm64；旧 CPU 请用 **Compatible** |

### 其他安装方式

- **Arch Linux**：`yay -S bettbox-bin` 或 `paru -S bettbox-bin`
- **旧 CPU 兼容包**：`yay -S bettbox-compatible-bin`
- **鸿蒙 NEXT**：可配合 [卓易通](https://harmonyos.cool/android-app) 使用

## 2. 平台注意事项

### Windows

- 安装版已处理权限，一般**无需**再次以管理员身份运行
- 若无法开启 TUN，请确认没有其他代理软件冲突

### macOS

1. 下载对应架构的 `.dmg`，拖入「应用程序」
2. 若被 Gatekeeper 拦截：在「应用程序」中**右键 → 打开**，或在「隐私与安全性」中选择「仍要打开」
3. 首次开启 TUN 时输入登录用户密码授权

### Android

- 授予必要后台权限，满足最低系统要求 Android 8.0+
- 低内存设备可选用 ARMv7 32 位包

### Linux

- 开启 TUN 时需输入密码完成权限授权

## 3. 导入订阅

1. 打开应用 → **配置 / Profiles**
2. 添加配置 → 选择通过 **URL** 导入
3. 粘贴订阅链接并确认

若导入失败，请先在浏览器中验证链接是否可访问，或联系订阅服务商。

## 4. 开启代理

- 桌面端可开启**系统代理**或 **TUN**
- 移动端使用 **VPN / TUN** 模式
- 在代理组中选择节点，必要时执行延迟测试

更多细节见 [功能指南](/docs/guide) 与 [常见问题](/docs/faq)。
