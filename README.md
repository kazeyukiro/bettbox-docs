# Bettbox Docs

[Bettbox](https://github.com/appshubcc/Bettbox) 的中文文档站点，使用 [Docusaurus](https://docusaurus.io/) 构建。

## 文档依据

内容按 **2026-11-21 的 Bettbox `main` 分支源码**重写，对应 `pubspec.yaml` 版本 `1.19.9+2026112101`。事实来源包括：

- `README.md` 与各语言 README
- `pubspec.yaml`、`setup.dart`、`.github/workflows/build.yaml`
- `lib/`：导航、设置、界面与网络工具实现
- `arb/intl_zh_CN.arb`：简体中文界面文案
- `core/Clash.Meta/`：Mihomo 内核配置示例与 Age 实现
- `android/`、`macos/` 等平台工程配置
- GitHub Release 说明

没有源码依据的说法不写入文档；版本差异会注明来自哪次 Release。

## 目录

| 路径 | 内容 |
| :--- | :--- |
| `docs/intro.md` | 项目介绍、平台要求、Lite / Standard / Compatible |
| `docs/getting-started.md` | 下载安装、导入订阅、开启代理 |
| `docs/guide/index.md` | 导航结构、设置分组、功能地图 |
| `docs/guide/config.md` | 订阅、更新、Age、备份与恢复、外部资源 |
| `docs/guide/proxies.md` | 代理组、规则、DNS、节点库 |
| `docs/guide/managed.md` | 托管模式、内置脚本与规则集 |
| `docs/guide/apps.md` | 分应用代理 |
| `docs/guide/widgets.md` | 首页卡片、Android 桌面小组件、主题、脚本 UI |
| `docs/guide/toolbox.md` | 网络与 DNS 调试工具 |
| `docs/guide/updates.md` | 应用内更新 |
| `docs/development.md` | 从源码构建 |
| `docs/migration.md` / `docs/faq.md` / `docs/contact.md` | 迁移、排障、反馈渠道 |
| `blog/` | Age Key 专题文章 |
| `src/pages/index.js` | 首页（下载、特性、更新日志） |
| `scripts/fetch-releases.mjs` | 构建时抓取 Releases 到 `static/releases.json` |

## 本地开发

仓库使用 npm（`package-lock.json`）：

```bash
npm ci
npm start
npm run build
npm run serve
```

`prebuild` 会从 GitHub API 抓取最近 30 个 Release；设置 `GITHUB_TOKEN` / `GH_TOKEN` 可提高速率限额，抓取失败时保留已有 `static/releases.json`。

## 部署

```bash
# 使用 SSH
USE_SSH=true npm run deploy

# 不使用 SSH
GIT_USER=<Your GitHub username> npm run deploy
```

站点通过 GitHub Pages 的 `gh-pages` 分支发布（见 `.github/workflows/deploy.yml`），自定义域名配置在 `CNAME` / `static/CNAME`。
