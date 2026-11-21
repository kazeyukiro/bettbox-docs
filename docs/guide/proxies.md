---
sidebar_position: 3
---

# 节点与代理组

本页说明代理组、延迟测试、流量接管方式、规则与 DNS，以及 v1.19.9 新增的节点库。

---

## 1. 代理组

 Mihomo 通过 `proxy-groups` 组织节点与出口策略。配置示例包含 `url-test`、`fallback`、`load-balance`、`select` 等类型。

Bettbox 的 **代理** 页面以可视化方式呈现代理组，并提供：

- 节点选择与测速
- 代理集（Providers）页面
- 高级设置、自动吸顶、显示隐藏项、隐藏超时节点等选项
- 代理节点菜单中的「配置信息」（v1.19.9）

---

## 2. 延迟测试

在 **代理** 页面点击测速按钮执行延迟测试。相关设置位于 **更多 → 设置 → 内核配置 → 通用**：

- `testUrl`：测速 URL，可选择自动或自定义（`speedTestServerAutoDesc`、`customUrl`）
- `unifiedDelay`：统一延迟（`unifiedDelayDesc`）
- `tcpConcurrent`：并发连接数（`tcpConcurrentDesc`）
- 高级设置中还包含「跟随规则」「使用系统 DNS」等测速选项（`speedTestFollowRules`、`speedTestUseSystemDnsDesc`）

中文文案 `speedTestCredit` 注明：测速服务器由网络上公开的第三方提供，感谢 Apple、Cloudflare 与 Speedtest by Ookla。

:::tip 测速动画
延迟动画共有 31 项：`none` 加 30 种动效。可在「延迟动画」中选择，也可同步到其他加载页面。
:::

---

## 3. 流量接管

| 模式 | 平台 | 说明 |
| :--- | :--- | :--- |
| 系统代理 | 桌面端 | 设置系统代理（`systemProxyDesc`） |
| 虚拟网卡（TUN） | 桌面端 | 使用 TUN 接管设备流量（`tunDesc`） |
| VPN | Android | 通过 VpnService 自动路由系统流量（`vpnEnableDesc`） |

相关内核选项位于 **内核配置 → 网络**：`strictRoute`（严格路由）、`stackMode`（栈模式）、`networkInterface`、`dnsHijack`、`endpointIndependentNat`、`bypassPrivateRoute`、`icmpForwarding`、`allowLan` 等。

- macOS / Linux 首次开启 TUN 需按系统提示输入密码。
- Android 需授予 VPN 权限并允许后台运行。
- 若开启失败，先排查其他代理软件或 VPN 是否占用虚拟网卡 / 端口。

---

## 4. 规则分流

 Mihomo 的规则由配置文件或托管脚本提供。可用规则类型包括 `DOMAIN`、`DOMAIN-SUFFIX`、`DOMAIN-KEYWORD`、`DOMAIN-REGEX`、`GEOSITE`、`IP-CIDR`、`IP-CIDR6`、`IP-ASN`、`GEOIP`、`SRC-GEOIP`、`DST-PORT`、`PROCESS-NAME`、`PROCESS-PATH`、`RULE-SET`、`MATCH` 等。

- 规则可指向某个代理组，由代理组决定最终出口。
- 自定义规则可通过[配置覆写](/docs/guide/config#4-编辑上传与导出)附加；v1.19.8 起覆写仅支持附加模式。
- 想确认某个域名实际命中了哪条规则，可用[工具箱](/docs/guide/toolbox)的 **路由追踪** 与 **MRS 速查**。

---

## 5. DNS 设置的变化

当前版本**没有独立的 DNS 覆写页面**：

- v1.19.8：完整移除原 DNS 覆写页面选项。
- v1.19.9：完整移除应用侧默认 DNS 配置覆写与覆写规则集自动注入，完全遵循配置文件或托管脚本的 DNS 设置。

因此 DNS 行为请：

1. 在配置文件的 `dns` 字段中调整；或
2. 使用[托管模式](/docs/guide/managed)的内置脚本与规则集；或
3. 用[工具箱](/docs/guide/toolbox)的 **DNS 查询** 对比「跟随规则 / 系统 DNS / 指定服务器」的解析差异。

内核配置中仍保留 NTP、Sniffer、Tunnel 与实验性覆写子页。

---

## 6. 节点库与落地节点

v1.19.9 新增节点库，入口在 **配置** 页面的节点区域。

### 添加节点

节点库的添加入口包括：

| 方式 | 中文说明 |
| :--- | :--- |
| 剪贴板 | 支持分享链接、Base64 与 YAML 片段（`nodeClipboardDesc`） |
| 二维码 | 扫描节点分享二维码（`nodeQrcodeDesc`） |
| 文件 | 从本地文件导入 |
| 手动输入 | 支持分享链接、Base64 与 YAML（`nodeManualDesc`） |
| 注册 Cloudflare WARP | 生成 WireGuard 落地节点（`registerWarpDesc`） |

注册 WARP 会向 Cloudflare 注册新设备，界面会提示先阅读[服务条款](https://www.cloudflare.com/terms/)。

### 落地节点与前置代理

- 可为落地节点指定**前置代理**（`frontProxy`）；切换前置时会自动重测延迟。
- 可自由选择**注入的代理组**（`joinGroups`）。
- 注入范围：非托管模式下仅对当前配置生效（`injectNodeDesc`）；也可「应用到托管配置」，对所有托管模式配置生效（`applyManagedDesc`）。
- 若前置节点不存在，会提示「前置 … 不存在，已直连」（`frontMissing`）。

### 节点分享与编辑

代理节点菜单新增「配置信息」：

- 生成节点分享二维码（`generateQrCode`）
- 复制 URI 分享链接（`nodeShareUri`），支持 SS / SSR / VMess / VLESS / Trojan / Hysteria / Hysteria2 / TUIC / AnyTLS / Socks5 / HTTP / Mieru
- 查看或编辑节点 YAML 配置，复制 YAML 片段（`configShareYaml`）

节点列表支持拖拽排序、批量操作与连通性检测；长按或右键可打开操作弹窗。

---

## 7. 连接页

v1.19.7 将请求页与连接页合并展示。当前 `PageLabel.connections` 在桌面端为独立标签，移动端可从「更多」进入。流量统计的进程排行支持点击跳转：Android 打开应用系统详情页，桌面端在文件管理器中定位程序文件（v1.19.9）。
