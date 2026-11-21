---
sidebar_position: 6
---

# 首页与小组件

本页区分两类能力：**App 内首页卡片**与 **Android 系统桌面小组件**。源码中它们是两套独立实现。

---

## 1. 首页卡片（Dashboard）

`lib/enum/enum.dart` 的 `DashboardWidget` 枚举定义了可添加到首页的卡片：

| 类别 | 卡片（枚举值） |
| :--- | :--- |
| 速度 / 状态 | `networkSpeed`、`networkSpeedSmall`、`trafficUsage`、`networkDetection`、`connectionsCount`、`memoryInfo`、`intranetIp`、`profileInfo` |
| 快捷开关 | `outboundModeV2`、`outboundMode`、`tunButton`（桌面）、`vpnButton`（Android）、`systemProxyButton`（桌面）、`ipv6Switch`、`wakelockSwitch`、`startButton` |
| 内核覆写 | `snifferOverride`、`ntpOverride` |
| 信息展示 | `providersInfo`、`fcmStatus`、`onlinePanel`、`mediaUnlock`、`mediaUnlockSmall`、`toolboxShortcut`（Android） |

说明：

- `startButton` 的 `GridItem` 设置 `isDeletable: false`，不能被删除。
- 平台限定卡片在枚举中通过 `platforms` 标注，例如 `tunButton` / `systemProxyButton` 仅桌面，`vpnButton` / `toolboxShortcut` 仅 Android。
- 尺寸由 `DashboardTileSize` 定义：`small(1,1)`、`wide(2,1)`、`tall(1,2)`、`large(2,2)`；`GridItem` 的 `crossAxisCellCount` 为 4 或 8。
- `networkSpeedSmall` / `networkSpeed`、`outboundMode` / `outboundModeV2`、`mediaUnlockSmall` / `mediaUnlock` 是可互换的大小变体（`_variantGroups`）。
- v1.19.9 优化仪表盘启动按钮卡片与顶部启动开关的联动，首页启动时间小部件可选关闭。

---

## 2. Android 系统桌面小组件

**v1.19.8 新增 Android 原生桌面小组件**（Release 说明）。这与首页卡片不是同一个东西。

源码位置：

- 接收器：`android/app/src/main/AndroidManifest.xml` 注册 `HomeWidgetLargeProvider`、`HomeWidgetWideProvider`、`HomeWidgetSquareProvider`
- Kotlin 实现：`android/app/src/main/kotlin/com/appshub/bettbox/widget/`
- Flutter 推送：`lib/manager/android_manager.dart` 监听 `homeWidgetSnapshotProvider` 并调用 `app.updateHomeWidget`

| 规格 | 中文名 | 内容 | 最小尺寸 |
| :--- | :--- | :--- | :--- |
| Large | 订阅 · 大号 | 流量用量、到期时间、当前节点与 VPN 开关 | 250×110 dp |
| Wide | 订阅 · 宽条 | 流量用量、当前节点与 VPN 开关 | 250×40 dp |
| Square | 订阅 · 方块 | 用量圆环、当前节点与刷新 | 110×110 dp |

其他事实：

- 三种规格均支持横向 / 纵向调整大小（`resizeMode="horizontal|vertical"`）。
- `updatePeriodMillis="0"`：不由系统定时轮询；数据由 App 在运行时通过 `SharedPreferences` 快照推送并刷新。
- 小组件上的 VPN 开关对应 `CHANGE` 动作，刷新按钮对应 `WIDGET_REFRESH`；未配置时显示 `home_widget_empty`：「打开 Bettbox 完成设置」。
- 该能力**仅 Android 有**；其他平台没有注册的原生桌面小组件。

---

## 3. 测速动画

`DelayAnimationType` 枚举共 31 项：

- `none`（无动画）
- 其余 30 项为实际动效，例如 `rotatingCircle`、`pulse`、`fadingCircle`、`dualRing`、`pumpingHeart`、`waveSpinner` 等。

可在「延迟动画」中切换，v1.19.5 起还支持将动画同步到其他加载页面。

---

## 4. 主题、图标与显示

`lib/views/tools.dart` 与 `lib/views/theme.dart` 中的相关设置：

| 项目 | 中文文案 |
| :--- | :--- |
| 主题模式 | 主题模式 |
| 主题色彩 | 主题色彩 |
| 字体修复 | `harmonyFont` |
| 文本缩放 | 文本缩放 |
| 图标设置 / 图标集 | 图标设置 / 图标集 |
| 桌面侧边栏悬浮卡片 | `sidebarFlyout`，可自定义入口 |
| 托盘图标反色 / Dock 图标 | `trayIconInvert`、`keepDockIcon` |

版本变化：

- v1.19.5 引入「无界」主题，并新增首页 / 工具箱可选浅色大图标。
- v1.19.7 新增 Android 12+ 首色自动莫奈取色、macOS Dock 图标与窗口显示状态同步。
- v1.19.8 用内置路由 SVG 矢量图标库替换平台图标，新增内置图标集。
- v1.19.9 引入 Phosphor 图标包，Android 端默认开启；移除深色桌面图标切换开关，改用矢量自适应图标。

---

## 5. 覆写脚本的图形界面适配

README 说明外置 JS 覆写脚本可适配图形化 UI。最简声明：

```js
const Compatible_With_Bettbox = { ruleOptionsEnable: true };
```

若脚本中同时包含策略组开关与其他功能开关，可用 `policyGroupOptions` 声明策略组开关名称；未声明的开关会归入「⚙️ 其他设置」二级菜单：

```js
const Compatible_With_Bettbox = {
  ruleOptionsEnable: true,
  // 声明属于策略组的开关名称，需与 ruleOptionsEnable 的键完全一致
  policyGroupOptions: ['🚀 节点选择', '🛑 广告拦截'],
};
```

未声明 `policyGroupOptions` 或名称不匹配时，所有开关平铺展示。

脚本管理入口：**更多 → 覆写脚本**（`lib/views/profiles/scripts.dart`），支持导入 URL、编辑、导出、同步与删除，并可管理内置「托管模式」脚本（见[托管模式](/docs/guide/managed)）。

:::note 本文源码依据
`lib/enum/enum.dart`（`DashboardWidget`、`DashboardTileSize`、`DelayAnimationType`）、`lib/views/dashboard/`、`lib/views/tools.dart`、`lib/views/theme.dart`、`lib/views/profiles/scripts.dart`、`lib/manager/android_manager.dart`、`android/app/src/main/AndroidManifest.xml`、`android/app/src/main/kotlin/com/appshub/bettbox/widget/`、`android/app/src/main/res/xml/home_widget_*_info.xml`、`README.md`、v1.19.5 / v1.19.7 / v1.19.8 / v1.19.9 Release 说明。
:::
