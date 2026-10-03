// @ts-check
// Bettbox Docs — Docusaurus 站点配置

import {themes as prismThemes} from 'prism-react-renderer';

const GITHUB_URL = 'https://github.com/appshubcc/Bettbox';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bettbox',
  tagline: 'Another Better Mihomo Client — 更好的体验，亦开箱可用',
  favicon: 'img/favicon.png',

  url: 'https://www.bettbox.dpdns.org',
  baseUrl: '/',

  organizationName: 'kazeyukiro',
  projectName: 'bettbox-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/kazeyukiro/bettbox-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/kazeyukiro/bettbox-docs/blob/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      metadata: [
        {
          name: 'description',
          content:
            'Bettbox 是基于 Mihomo（Clash Meta）内核的多平台代理客户端，支持 Android、Windows、macOS、Linux。开箱即用、前台流畅、后台省电。',
        },
        {name: 'keywords', content: 'Bettbox, Mihomo, Clash Meta, 代理, 客户端, 下载'},
        {name: 'theme-color', content: '#f3efea', media: '(prefers-color-scheme: light)'},
        {name: 'theme-color', content: '#16151a', media: '(prefers-color-scheme: dark)'},
      ],
      navbar: {
        title: 'Bettbox',
        logo: {
          alt: 'Bettbox Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/#download',
            label: '下载',
            position: 'left',
          },
          {
            to: '/#features',
            label: '特性',
            position: 'left',
          },
          {
            to: '/#changelog',
            label: '更新日志',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            type: 'html',
            position: 'right',
            value:
              '<a class="navbar-icon-link" href="' +
              GITHUB_URL +
              '" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub 仓库"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg></a>',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '产品',
            items: [
              {label: '下载', to: '/#download'},
              {label: '核心特性', to: '/#features'},
              {label: '更新日志', to: '/#changelog'},
              {label: 'Releases', href: `${GITHUB_URL}/releases`},
            ],
          },
          {
            title: '文档',
            items: [
              {label: '快速开始', to: '/docs/getting-started'},
              {label: '功能指南', to: '/docs/guide'},
              {label: '常见问题', to: '/docs/faq'},
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Telegram 频道',
                href: 'https://t.me/appshub_channel',
              },
              {
                label: 'Telegram 交流群',
                href: 'https://t.me/appshub_chat',
              },
              {label: 'GitHub Issues', href: `${GITHUB_URL}/issues`},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bettbox · 基于 Mihomo 内核 · GPL-3.0 开源 · Built with Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
