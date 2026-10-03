// 构建时预抓取 Bettbox 的 GitHub Releases，落地为 static/releases.json。
// 前端优先读取该静态文件，避免运行时受 GitHub API 限流 / CORS / 网络环境影响。
// 支持 GITHUB_TOKEN / GH_TOKEN 环境变量以提高速率限额；抓取失败时保留已有文件兜底。

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const REPO = 'appshubcc/Bettbox';
const OUT = new URL('../static/releases.json', import.meta.url);
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'bettbox-docs',
};
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

async function main() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
      headers,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const slim = (Array.isArray(data) ? data : [])
      .filter((r) => !r.draft)
      .map((r) => ({
        id: r.id,
        tag_name: r.tag_name,
        name: r.name || r.tag_name,
        published_at: r.published_at,
        html_url: r.html_url,
        prerelease: !!r.prerelease,
        body: r.body || '',
      }));

    await mkdir(new URL('.', OUT), { recursive: true });
    await writeFile(OUT, JSON.stringify(slim, null, 2));
    console.log(`✓ 已写入 ${slim.length} 条 releases → ${OUT.pathname}`);
  } catch (e) {
    if (existsSync(OUT)) {
      // 保留历史兜底数据，不让构建失败
      const prev = JSON.parse(await readFile(OUT, 'utf8')).length;
      console.warn(`⚠ 抓取 releases 失败（${e.message}），保留已有 ${prev} 条兜底数据。`);
      process.exit(0);
    }
    await writeFile(OUT, '[]');
    console.warn(`⚠ 抓取 releases 失败（${e.message}）且无旧文件，写入空数组避免 404。`);
    process.exit(0);
  }
}

main();
