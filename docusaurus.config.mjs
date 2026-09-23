import dotenv from 'dotenv'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

dotenv.config()

const config = {
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
  customFields: {
    stagingEnv: process.env.REACT_APP_STAGING,
    nodeEnv: process.env.NODE_ENV,
  },
  title: 't1 Docs',
  tagline: 'Documentation for t1, the permissionless credit protocol for DeFi.',
  url: 'https://docs.t1protocol.com',
  // PostHog project "t1" (shared with t1protocol.com, told apart by $host), sent
  // through this site's own /relay proxy (netlify.toml) so ad blockers don't drop it.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: 'if(!/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)){!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register identify reset get_distinct_id captureException".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init("phc_ncQxnKfh4f3u4NFQW8GVC9sxKsNsR7WBqbFEjg6zdrtS",{api_host:location.origin+"/relay",ui_host:"https://us.posthog.com",capture_pageview:"history_change",capture_exceptions:true});}',
    },
  ],
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 't1protocol',
  projectName: 't1-docs',
  themeConfig: {
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    image: 'img/t1-rollup.png',
    metadata: [
      { name: 'twitter:site', content: '@t1protocol' },
      { name: 'twitter:creator', content: '@t1protocol' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 't1' },
      { property: 'og:image:alt', content: 't1' },
      { name: 'twitter:image:alt', content: 't1' },
      { property: 'og:image:width', content: '3200' },
      { property: 'og:image:height', content: '1772' },
    ],
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
          to: '/intro/protocol/introduction',
          label: 'Introduction',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/integration',
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
              label: 'Introduction',
              to: '/intro/protocol/introduction',
            },
            {
              label: 'Integration',
              to: '/integration',
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
              label: 'Blog',
              href: 'https://t1protocol.substack.com/',
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
              label: 'Twitter',
              href: 'https://x.com/t1protocol',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/efGTM9q54s',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} by t1`,
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
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
          editUrl: 'https://github.com/t1protocol/docs/tree/main/',
          includeCurrentVersion: true,
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/colors.css'],
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
    function disableCSSMinimization(_context, _options) {
      return {
        name: 'disable-css-minimization',
        configureWebpack(config, isServer) {
          if (!isServer) {
            // Disable CSS minimization to avoid broken styles
            if (config.optimization?.minimizer) {
              config.optimization.minimizer = config.optimization.minimizer.filter(
                (minimizer) => minimizer.constructor.name !== 'CssMinimizerPlugin'
              )
            }
          }
        },
      }
    },
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-3RN3N09K6C', // Your GA4 measurement ID
      },
    ],
  ],
}

export default config
