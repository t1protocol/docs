const math = require('remark-math')
const katex = require('rehype-katex')
require('dotenv').config()

module.exports = {
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
  customFields: {
    stagingEnv: process.env.REACT_APP_STAGING,
    nodeEnv: process.env.NODE_ENV,
  },
  title: 't1',
  tagline: 'Documentation and Guides',
  url: 'https://docs.t1protocol.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 't1protocol',
  projectName: 't1-docs',
  themeConfig: {
    image: 'img/t1-rollup.png',
    prism: {
      additionalLanguages: ['solidity'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
    // not using search for now
    // algolia: {
    //   appId: 'PLACEHOLDER',
    //   apiKey: 'PLACEHOLDER',
    //   indexName: 't1-docs',
    //   contextualSearch: true,
    // },
    navbar: {
      title: 't1 Docs',
      items: [
        {
          to: '/concepts/protocol/introduction',
          label: 'Concepts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/integration/xChainRead/overview',
          label: 'Integration',
          position: 'left',
          className: 'V3_active',
        },
        {
          href: 'https://github.com/t1protocol/',
          label: 'GitHub',
          position: 'right',
          className: 'persistent',
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Concepts',
              to: '/concepts/protocol/introduction',
            },
            {
              label: 'Integration',
              to: '/integration/xChainRead/overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Website',
              href: 'https://www.t1protocol.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/t1protocol',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/nbvyXZHgke',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/t1protocol',
            },
            {
              label: 'Blog',
              href: 'https://t1protocol.substack.com/',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} t1 Protocol. Built with Docusaurus.`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [[math, {}]],
          rehypePlugins: [[katex, { strict: false }]],
          editUrl: 'https://github.com/t1protocol/docs/tree/main/',
          includeCurrentVersion: true,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/colors.css')],
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [],
}
