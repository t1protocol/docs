const math = require('remark-math')
const katex = require('rehype-katex')
require('dotenv').config()

module.exports = {
  customFields: {
    // Analytics proxy URL
    // analyticsProxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
    // Determines if staging env
    stagingEnv: process.env.REACT_APP_STAGING,
    // From node
    nodeEnv: process.env.NODE_ENV,
  },
  title: 't1',
  tagline: 'Documentation and Guides',
  url: 'https://docs.t1protocol.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 't1', // Usually your GitHub org/user name.
  projectName: 't1-docs', // Usually your repo name.
  themeConfig: {
    image: 'img/t1-rollup.png',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: null,
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
          // TODO(docs): Publish docs repo and make public at this URL
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
          title: 'Developers',
          items: [
            {
              label: 'How it works',
              href: 'https://www.t1protocol.com/#how-it-works',
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
              label: 'X',
              href: 'https://x.com/t1protocol',
            },
            {
              label: 'Blog',
              href: 'https://t1protocol.substack.com/',
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/t1protocol/docs/tree/main/',
          includeCurrentVersion: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
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
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Redirect from multiple old paths to the new path
          {
            to: '/concepts/resources/',
            from: ['/tee-litepaper.pdf'],
          },
        ],
      },
    ],
    '@saucelabs/theme-github-codeblock',
    {},
  ],
}
