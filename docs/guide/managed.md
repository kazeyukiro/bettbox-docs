---
sidebar_position: 4
---

# 托管模式

**托管模式**是 v1.19.8 引入的能力：使用内置脚本生成代理组与规则。中文界面说明为「使用内置脚本生成代理组与规则」（`managedModeDesc`）。

---

## 1. 启用位置

- 配置编辑页有 **托管模式** 开关，旁边的按钮可打开托管选项面板（`lib/views/profiles/edit_profile.dart` 中调用 `showManagedOptions`）。
- **代理** 页面、配置编辑页、**覆写脚本** 页面、**订阅合并** 页面也可进入同一面板。
- **更多 → 覆写脚本** 中列出了名为「托管模式」的内置脚本，可查看、编辑、导出或恢复内置版本（`lib/views/profiles/scripts.dart`）。

---

## 2. 内置脚本

v1.19.8 Release 说明：新增托管脚本与内置分流预设，支持完全自定义，规则处理更完善。

源码内置：

| 文件 | 用途 |
| :--- | :--- |
| `assets/scripts/managed.js` | 内置托管脚本 |
| `assets/scripts/routing.json` | 内置路由目录 |

v1.19.9 进一步优化：移除远程在线同步，统一使用内置脚本与路由目录，同时保留自定义编辑与备份恢复。

在「覆写脚本」页面可以对托管脚本：

- 只读查看内置内容
- 编辑并保存自定义内容（保存前会校验）
- 导出为文件
- 恢复内置版本（`restoreBundled`）

---

## 3. 可配置项

`lib/views/profiles/managed_options.dart` 中的设置面板提供：

| 项目 | 中文文案 / 行为 |
| :--- | :--- |
| 内置托管模式 | `builtInManagedMode` |
| 国家 / 地区 | `countryOrRegion`，可选择或添加地区 |
| 地区分组 | `regionGroups`；没有匹配节点的地区不会生成策略组，未匹配任何地区的节点归入「其他节点」（`regionGroupsTip`） |
| 服务 | 可搜索服务名称（`searchServices`），并按服务设置目标；`REJECT` 显示为「拒绝」 |
| 路由 | 按 `RouteCategory` 分类选择，`lib/enum/enum.dart` 中列有 `ai`、`streaming` 等类别 |
| 规则集 | `ruleSets`，可添加规则集、搜索、使用自定义规则集 URL（`customRuleSetUrl`）；超过 10000 条会提示占用更多内存（`largeRuleSetTip`） |
| 代理组 | `proxyGroup`，可选择节点加入的代理组 |
| 图标 | 支持自动 / 无图标 / 自定义 |
| 应用到全局托管模式 | `applyToAllManaged`，用于覆写规则等配置在所有托管模式配置间共享 |

---

## 4. 与覆写规则的关系

- 配置页的「覆写」功能可为当前配置附加规则；v1.19.8 起仅支持附加模式。
- v1.19.9 新增「应用到全局托管模式」开关，允许自定义覆写规则在所有托管模式配置间共享；目标代理组不存在时会自动回退到默认代理（Release 说明）。
- DNS 不再由应用侧覆写：v1.19.9 完全移除应用侧默认 DNS 配置覆写与覆写规则集自动注入，遵循配置文件或托管脚本的 DNS 设置。

---

## 5. 托管模式下的节点注入

v1.19.9 的节点库支持把落地节点注入托管配置：

- 「应用到托管配置」会让所有托管模式下的配置同时生效（`applyManaged` / `applyManagedDesc`）。
- 非托管模式下，注入仅对当前配置生效（`injectNodeDesc`）。
- 托管模式中有对应地区组时，节点按地区加入；地区组不存在时按普通节点使用（`managedNodeTip`）。

详见[节点与代理组](/docs/guide/proxies#6-节点库与落地节点)。

:::note 本文源码依据
`lib/views/profiles/managed_options.dart`、`lib/views/profiles/scripts.dart`、`lib/views/profiles/edit_profile.dart`、`lib/views/profiles/override_profile.dart`、`lib/enum/enum.dart`（`RouteCategory`）、`assets/scripts/managed.js`、`assets/scripts/routing.json`、`arb/intl_zh_CN.arb`、v1.19.8 / v1.19.9 Release 说明。
:::
