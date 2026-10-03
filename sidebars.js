// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'doc', id: 'intro', label: '🏠 介绍' },
    { type: 'doc', id: 'getting-started', label: '🚀 快速开始' },
    {
      type: 'category',
      label: '🔧 功能指南',
      link: { type: 'doc', id: 'guide/index' },
      items: [
        'guide/config',
        'guide/proxies',
        'guide/apps',
        'guide/widgets',
      ],
    },
    { type: 'doc', id: 'migration', label: '🔄 迁移指南' },
    { type: 'doc', id: 'faq', label: '❓ 常见问题' },
    { type: 'doc', id: 'contact', label: '💬 交流与反馈' },
  ],
};

export default sidebars;
