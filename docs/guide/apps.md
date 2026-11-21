---
sidebar_position: 5
---

# 分应用代理

**分应用代理**允许指定哪些 App 的流量进入 VPN、哪些被排除。界面说明为「配置应用访问黑白名单」（`accessControlDesc`）。

---

## 1. 入口与适用范围

- 入口：**更多 → 设置 → 分应用代理**（`lib/views/tools.dart` 的「设置」分组；功能页为 `lib/views/access.dart`）。
- 它作用于 **VPN / TUN 接管范围**，与配置文件里的 `rules` 分流规则是两层不同机制。
- 修改后界面提示 `restartTip`：「重启 TUN 后生效」或 `vpnTip`：「重启 VPN 后生效」。

---

## 2. 两种模式

`lib/enum/enum.dart` 的 `AccessControlMode` 只有两个值：

| 枚举值 | 中文名 | 行为 |
| :--- | :--- | :--- |
| `acceptSelected` | 白名单模式 | 仅勾选的应用进入 VPN |
| `rejectSelected` | 黑名单模式 | 勾选的应用被排除在 VPN 之外 |

:::tip 如何选择
- 只让少数 App 走代理 → 白名单。
- 几乎所有流量都走代理，仅排除少数本地 / 金融类 App → 黑名单。
:::

---

## 3. 操作方式

`lib/views/access.dart` 提供的操作：

- 搜索并选择应用；
- **过滤系统应用** / 取消过滤（`filterSystemApp`）；
- 在 **所有应用** 与 **仅第三方应用** 之间切换（`allApps` / `onlyOtherApps`）；
- **刷新应用列表**（`refreshAppList`），新装 App 未出现时使用；
- 长按应用条目会调用 `app.openAppDetails(packageName)`，**打开该应用的系统详情页**；若应用未安装则提示 `appNotInstalled`；
- 页面还提供复制 / 粘贴当前黑白名单配置的按钮（`_copyToClipboard` / `_pasteToClipboard`），复制内容为 JSON。

首次进入需要授予「访问已安装应用列表」权限；被拒绝时界面提示 `packageListPermissionDenied`。

---

## 4. 注意事项

- 除非清楚用途，不建议把系统组件加入代理范围；可开启「过滤系统应用」避免误选。
- 部分 App 依赖多个进程，分流不生效时需检查对应条目。
- 修改后如未立即生效，按界面提示重启 TUN 或 VPN 服务。
- 页面内可复制整份配置，换机时可用粘贴恢复，避免逐项重选。

:::note 本文源码依据
`lib/views/access.dart`、`lib/views/tools.dart`、`lib/enum/enum.dart`（`AccessControlMode`）、`arb/intl_zh_CN.arb`。
:::
