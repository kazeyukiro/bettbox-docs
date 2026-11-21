---
title: 聊聊 Mihomo 的 Age Key 与 Bettbox 中的用法
authors:
  - default

tags:
  - mihomo
---

本文只讲**机制与在 Bettbox 中的落点**，不对项目历史或第三方争议做未经验证的叙述。所有结论都能在 Bettbox 源码中找到对应实现。

---

## Age Key 解决什么

Age Key 用于**加密订阅文件**：内容由公钥加密，只有持有对应私钥的客户端才能解密。Mihomo 的配置示例 `core/Clash.Meta/docs/config.yaml` 中提供了 `age-secret-key` 字段，注释说明该字段会尝试用私钥解密 age armor 格式加密的配置文件。

源码 `core/Clash.Meta/component/age/age.go` 使用 `github.com/metacubex/age` 与 `armor` 包，支持：

- `age.X25519Identity` / `age.X25519Recipient`
- `age.HybridIdentity` / 混合 recipient（后量子场景）

因此这里说的「密钥对」是 **X25519 / Age 密钥对**，不是 AES 口令。

---

## 三种常见配置方式

以下三种做法是配置层面的组合方式，均可在 Mihomo 提供的字段中找到对应位置：

### 方式一：服务商加密订阅，用户提供私钥

服务商用公钥加密订阅文件；用户导入 URL 后，在配置中填入服务商提供的私钥。`core/profile_import.go`、`core/hub.go` 中会调用 `age.DecryptBytes` 处理加密内容。

### 方式二：用户自己生成密钥对

用户生成密钥对，把公钥交给服务商配置加密；自己保留私钥并填入客户端。Bettbox 配置编辑页右上角的钥匙按钮可生成 X25519 密钥对，并从私钥反推公钥（`lib/views/profiles/edit_profile.dart`）。

### 方式三：在 Provider 请求头中带公钥

`core/Clash.Meta/docs/config.yaml` 演示了在 `proxy-providers` 的 `header` 中携带 `X-Age-Public-Key` 的写法：客户端在请求订阅时主动声明公钥，服务端据此下发用该公钥加密的内容。这种方式适合自己编写配置并添加 Providers 的场景。

---

## 在 Bettbox 里怎么填

### 导入订阅时

「从 URL 导入」后打开的配置编辑页包含 **Age 私钥（可选）**（`ageSecretKeyOptional`）。字段校验要求私钥以 `AGE-SECRET-KEY-` 开头（`ageSecretKeyInvalidValidationDesc`）。

### 配置编辑页

右上角钥匙按钮打开密钥生成对话框：

- 可生成 X25519 密钥对
- 可从已有私钥反推公钥
- 成功后提示 `ageKeyPairGeneratedSuccess`

### 工具箱

「更多 → 工具箱 → Age 加解密」对应 `lib/pages/toolbox/age_tool.dart` 与 `core/toolbox/age_tool.go`：

| 标签页 | 功能 |
| :--- | :--- |
| 密钥 | 生成 X25519 或 `MLKEM768-X25519` 混合密钥；从私钥生成公钥 |
| 加密 | 填写一个或多个 `age1…` 接收者公钥，加密文本或文件 |
| 解密 | 填写 `AGE-SECRET-KEY-` 私钥，解密 age 装甲格式内容 |

密文文件头为 `-----BEGIN AGE ENCRYPTED FILE-----`（`armor.Header`）。单次处理文件上限为 **8 MB**（`_maxAgeFileSize`）。界面明确提示：「所有操作都在本机完成，私钥不会被保存或上传」（`ageToolTip`）。

---

## 与 AES-256 的区别

Bettbox 中 AES-256 的用途是**备份文件密码加密**，中文文案 `backupPasswordDesc` 写明「使用 AES-256 加密备份，留空则不加密」。它与订阅内容的 Age 加密是两回事：

| 用途 | 算法 | 位置 |
| :--- | :--- | :--- |
| 订阅内容加密 | Age（X25519 / 混合） | `core/Clash.Meta/component/age/`、`core/profile_import.go` |
| 备份文件加密 | AES-256 | 备份与恢复设置（`backupPasswordDesc`） |

---

## 相关文档

- [配置与订阅](/docs/guide/config#3-age-加密订阅)
- [工具箱](/docs/guide/toolbox#2-age-加解密)
- [常见问题](/docs/faq#订阅与配置)

:::note 本文源码依据
`core/Clash.Meta/docs/config.yaml`、`core/Clash.Meta/component/age/age.go`、`core/profile_import.go`、`core/hub.go`、`core/provider_expand.go`、`core/toolbox/age_tool.go`、`lib/views/profiles/edit_profile.dart`、`lib/pages/toolbox/age_tool.dart`、`lib/views/backup_and_recovery.dart`、`arb/intl_zh_CN.arb`。
:::
