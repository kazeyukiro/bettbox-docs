---
sidebar_position: 2
---

# 配置与订阅

Bettbox 的「配置」指一份 Mihomo YAML 配置及其订阅元数据。本页覆盖导入、更新、编辑、合并、备份与恢复。

---

## 1. 导入配置

入口：**配置** 页面 → 右下角 **＋**。`lib/views/profiles/add_profile.dart` 提供四种入口：

| 入口 | 说明 |
| :--- | :--- |
| **URL** | 粘贴订阅链接；导入后可设置名称、自动更新间隔、Age 私钥 |
| **剪贴板** | 自动读取剪贴板中的订阅链接（`clipboardDesc`） |
| **文件** | 选择本地配置文件 |
| **二维码** | 移动端调用相机；桌面端上传二维码图片（`pleaseUploadValidQrcode`） |

Android TV 另有扫码 / 局域网导入弹窗（`tv_qr_import_dialog.dart`）：用手机扫码，或在网页中粘贴订阅链接、上传配置后推送到电视。

也可以点击兼容的安装链接直接导入。Android manifest 注册了 `clash`、`clashmeta`、`flclash`、`bettbox` 四种 `install-config` scheme。

---

## 2. 自动更新

配置编辑页包含「自动更新」开关与字段 **自动更新间隔（分钟）**（`autoUpdateInterval`）。单位是**分钟**，不是小时：例如 12 小时填 `720`，24 小时填 `1440`。

源码 `lib/views/profiles/edit_profile.dart` 中，手工修改配置后会提示 `profileHasUpdate`：「配置文件已经修改，是否关闭自动更新？」——这是为了避免自动更新覆盖本地改动。

---

## 3. Age 加密订阅

若订阅内容由 Age 公钥加密，需要在配置编辑页填写 **Age 私钥（可选）**（`ageSecretKeyOptional`），私钥以 `AGE-SECRET-KEY-` 开头。

- 解密路径：`core/Clash.Meta/component/age/age.go` 使用 `age.DecryptBytes`；`core/profile_import.go`、`core/hub.go`、`core/provider_expand.go` 等处调用。
- 密钥类型：X25519，另有后量子混合类型 `MLKEM768-X25519`（`lib/pages/toolbox/age_tool.dart` 的 `hybrid`）。
- 密文格式：age 装甲格式，头为 `-----BEGIN AGE ENCRYPTED FILE-----`。
- **AES-256 不是订阅加密算法**；中文文案 `backupPasswordDesc` 写明 AES-256 用于**备份文件**密码加密。
- 配置编辑页右上角的钥匙按钮可生成 X25519 密钥对，并从私钥反推公钥。
- 若自己写配置，Mihomo 配置示例 `core/Clash.Meta/docs/config.yaml` 中有 `age-secret-key` 字段，并可在 Provider 的 `header` 中携带 `X-Age-Public-Key`。

背景说明见[博客文章](/blog/2026/06/08/mihomo-age-key)。

---

## 4. 编辑、上传与导出

在配置列表中打开配置的编辑页（`lib/views/profiles/edit_profile.dart`），可：

- 修改名称、URL、自动更新间隔、Age 私钥。
- 切换 **托管模式** 并打开其设置面板（见[托管模式](/docs/guide/managed)）。
- 对当前配置文件执行 **编辑 / 上传 / 导出文件**。
- 打开 **覆写** 页面，为配置附加自定义规则。

编辑器为 `plugins/code_forge` 提供的 code-forge，README 将其列为「高性能 Code-forge 编辑器」。

### 覆写规则

`lib/views/profiles/override_profile.dart` 提供规则覆写，规则类型来自 `RuleAction` 枚举（如 `DOMAIN`、`DOMAIN-SUFFIX`、`GEOSITE`、`IP-CIDR`、`RULE-SET`、`MATCH` 等），并有「启用覆写」「附加到原始规则」「应用到全局托管模式」等选项。

:::caution 覆写模式
v1.19.8 Release 说明明确：「覆写规则仅支持配置附加模式（避免误解）」。因此不要按「完全替换订阅规则」来理解该页面。
:::

---

## 5. 订阅合并

v1.19.8 新增「订阅合并」，源码为 `lib/views/profiles/merge_profile.dart`。

- 界面名称：**订阅合并**，说明为「将多个订阅合并，统一管理分流配置」。
- 至少需要两个配置才能合并（`mergeProfileUnavailable`）。
- 合并后可在配置列表中收起成员订阅（`bundleCollapse`）；成员数量上限见 `bundleMemberLimit` 文案。
- 删除已合并的成员时，会提示该配置将从合并订阅中移除（`deleteMemberTip`）。
- 合并页也提供托管模式设置入口。

---

## 6. 备份与恢复

入口：**更多 → 设置 → 备份与恢复**（`lib/views/backup_and_recovery.dart`）。

| 项目 | 文案 / 行为 | 依据 |
| :--- | :--- | :--- |
| **远程备份 / 恢复** | 备份到 WebDAV，从 WebDAV 恢复；可配置 WebDAV 地址与凭据 | `remoteBackupDesc`、`remoteRecoveryDesc`、`webDAVConfiguration` |
| **本地备份 / 恢复** | 备份到本地文件，从文件恢复 | `localBackupDesc`、`localRecoveryDesc` |
| **自动备份** | 配置新增或修改后自动备份 | `autoBackupDesc` |
| **备份密码** | 使用 **AES-256** 加密备份，留空则不加密 | `backupPasswordDesc` |
| **恢复策略** | `compatible`（兼容）：保留本机已有配置和脚本，按 ID 合并；`override`（覆盖）：清空本机配置和脚本，完全替换 | `RecoveryStrategy` 枚举及 `recoveryStrategyDesc_*` |
| **恢复范围** | `RecoveryOption.all` 或 `RecoveryOption.onlyProfiles` | `lib/enum/enum.dart` |
| **备份版本** | 可从多个备份版本中选择 | `selectBackupVersion` |

v1.19.7 新增 WebDAV 自动备份与备份密码 AES 加密；v1.19.9 修复了兼容模式恢复备份时产生重复订阅的问题，并会按相同订阅 URL 复用本地配置 ID 与名称。

:::caution 换机建议
迁移前先做一次备份，在新设备恢复后手动执行一次订阅同步，避免遗漏最新节点。
:::

---

## 7. 外部资源

入口：**更多 → 外部资源**（`lib/views/resources.dart`）。界面说明为「查看外部资源或规则集合」。

`geoItems` 列出四类内置资源：

| 资源 | 文件用途 |
| :--- | :--- |
| GeoSite | 域名分类数据 |
| MMDB | GeoIP 数据库 |
| ASN | ASN 数据库 |
| MRS | 规则集数据 |

页面支持查看更新时间、同步全部、重置为内置下载地址，以及展示订阅的 Providers。`setup.dart` 会从 [bett-rules](https://github.com/appshubcc/bett-rules) 下载 `geosite.dat`、`geoip.metadb`、`GeoLite2-ASN-lite.mmdb` 与 `BundleMRS.7z` 作为内置数据。

:::note 本文源码依据
`lib/views/profiles/add_profile.dart`、`lib/views/profiles/edit_profile.dart`、`lib/views/profiles/merge_profile.dart`、`lib/views/profiles/override_profile.dart`、`lib/views/backup_and_recovery.dart`、`lib/views/resources.dart`、`lib/pages/toolbox/age_tool.dart`、`lib/enum/enum.dart`、`core/Clash.Meta/component/age/age.go`、`core/Clash.Meta/docs/config.yaml`、`arb/intl_zh_CN.arb`、v1.19.7 / v1.19.8 / v1.19.9 Release 说明。
:::
