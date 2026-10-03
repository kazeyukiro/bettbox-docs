// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

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
      image: 'img/logo.jpg',
      metadata: [
        {
          name: 'description',
          content:
            'Bettbox 是基于 Mihomo（Clash Meta）内核的多平台代理客户端，支持 Android、Windows、macOS、Linux。开箱即用、前台流畅、后台省电。',
        },
        {name: 'keywords', content: 'Bettbox, Mihomo, Clash Meta, 代理, 客户端'},
      ],
      navbar: {
        title: 'Bettbox',
        logo: {
          alt: 'Bettbox Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            to: '/#download',
            label: '下载',
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
            href: 'https://github.com/appshubcc/Bettbox/releases',
            label: '更新日志',
            position: 'left',
          },
          {
            href: 'https://github.com/appshubcc/Bettbox',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
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
            ],
          },
          {
            title: '更多',
            items: [
              {label: '博客', to: '/blog'},
              {
                label: 'GitHub',
                href: 'https://github.com/appshubcc/Bettbox',
              },
              {
                label: 'Releases',
                href: 'https://github.com/appshubcc/Bettbox/releases',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bettbox. GPL-3.0 · Built with Docusaurus.`,
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
