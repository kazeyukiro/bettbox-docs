---
sidebar_position: 6
---

# 常见问题

---

## 安装与安全

**Q：安卓无法后台保活 / 经常断连？**  
A：请检查是否授予充足后台权限，并确认系统 ≥ Android 8.0。部分厂商需手动关闭电池优化、允许自启动与后台运行。

**Q：桌面端旧电脑运行异常 / 闪退？**  
A：2012 年前后及更早 CPU（如 AMD v1 架构）请下载 **Compatible** 兼容版本，而非标准包。

**Q：软件是否安全？会不会上传隐私？**  
A：Bettbox 开源（GPL-3.0）、无广告，代码与 CI 公开可审计，已通过 [SignPath](https://signpath.io) 开源基金会人工安全溯源；Windows 端带有 OV 数字签名。零隐私收集。

**Q：从哪里下载才是官方的？**  
A：唯一官方下载源是 [GitHub Releases](https://github.com/appshubcc/Bettbox/releases/latest)。请勿从不明第三方站点下载。

---

## 桌面端

**Q：Windows 需要管理员权限吗？**  
A：安装版已预先处理权限，**一般无需**再次手动提权。

**Q：无法开启 TUN 虚拟网卡？**  
A：macOS / Linux 请确保输入正确密码完成权限授权；并确认没有其他代理软件 / VPN 占用虚拟网卡。

**Q：启动报错？**  
A：请附上 Debug 信息提交 Issue，并确认没有冲突的代理服务在运行。

**Q：macOS 安装被系统拦截？**  
A：当前暂未购买 Apple 开发者证书，可能被 Gatekeeper 拦截：
1. **推荐**：在「应用程序」中右键 Bettbox →「打开」→ 确认再次「打开」。
2. **备选**：「系统设置 → 隐私与安全性」中找到 Bettbox，点「仍要打开」。

---

## 订阅与配置

**Q：无法导入订阅链接？**  
A：先在浏览器验证链接是否可用；重置链接后重试。若 DEBUG 确认是客户端问题，请提交 Issue。

**Q：节点显示为 0？**  
A：配置内可能无有效 `proxy` 字段，请确认订阅是否已过期，或联系服务商。

**Q：测速无响应 / 节点延迟不显示？**  
A：请前往 **更多 → 资源**，确保 GeoIP / GeoSite 数据库已下载完整。

**Q：配置损坏或异常？**  
A：较新版本支持配置自动修复与恢复，也可尝试从 WebDAV 备份还原。

---

## 反馈渠道

书写认真、包含复现步骤与日志的 Issue 会被优先处理：

- [提交 Bug](https://github.com/appshubcc/Bettbox/issues)
- [功能建议](https://github.com/appshubcc/Bettbox/issues)
- [Telegram 交流群](https://t.me/appshub_chat)
