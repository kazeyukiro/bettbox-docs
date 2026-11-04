# Bettbox Docs

[Bettbox](https://github.com/appshubcc/Bettbox) 的中文文档站点，使用 [Docusaurus](https://docusaurus.io/) 构建。

文档内容以 **Bettbox 源码仓库**的 README、源码（`lib/`、`core/`、`setup.dart`、`.github/workflows/build.yaml`、简体中文语言包 `arb/intl_zh_CN.arb`）与 Release 说明为依据校对，避免与客户端实际界面和功能脱节。

## 目录

| 路径 | 内容 |
| :--- | :--- |
| `docs/intro.md` | 介绍、支持平台、核心特性 |
| `docs/getting-started.md` | 下载安装、导入订阅、开启代理 |
| `docs/guide/` | 配置与订阅、节点与代理组、分应用代理、小组件与个性化、工具箱 |
| `docs/development.md` | 从源码构建（依赖、命令、构建矩阵） |
| `docs/migration.md` / `docs/faq.md` / `docs/contact.md` | 迁移、排障、反馈渠道 |
| `src/pages/index.js` | 首页（下载、特性、更新日志） |
| `scripts/fetch-releases.mjs` | 构建时预抓取 Releases 到 `static/releases.json` |

## 本地开发

仓库使用 npm（`package-lock.json`），也可用 yarn：

```bash
npm ci          # 或 yarn
npm start       # 本地开发服务器，改动实时预览
npm run build   # 先执行 prebuild 抓取 Releases，再生成静态站点到 build/
npm run serve   # 本地预览构建结果
```

`prebuild` 会调用 `scripts/fetch-releases.mjs` 从 GitHub API 抓取最近 30 个 Release；设置 `GITHUB_TOKEN` / `GH_TOKEN` 可提高速率限额，抓取失败时保留已有 `static/releases.json` 兜底。

## 部署

```bash
# 使用 SSH
USE_SSH=true npm run deploy

# 不使用 SSH
GIT_USER=<Your GitHub username> npm run deploy
```

站点通过 GitHub Pages 的 `gh-pages` 分支发布（见 `.github/workflows/deploy.yml`），自定义域名配置在 `CNAME` / `static/CNAME`。
