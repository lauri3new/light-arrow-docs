module.exports = {
  title: 'Light-Arrow',
  tagline: 'Composable and type safe asynchronous programming for Typescript',
  url: 'https://lauri3new.github.io',
  baseUrl: '/light-arrow-docs/',
  favicon: 'img/favicon.ico',
  organizationName: 'lauri3new', // Usually your GitHub org/user name.
  projectName: 'light-arrow-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Light-Arrow',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      links: [
        {to: 'docs/Arrow', label: 'Docs', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/lauri3new/Light-Arrow',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Arrow',
              to: 'docs/Arrow',
            },
            {
              label: 'express',
              to: 'docs/HttpApp',
            }
          ],
        },
        {
          title: 'Projects',
          items: [
            {
              label: 'Disaster Check In App',
              href: 'https://disastercheckin.app/',
            },
            {
              label: 'GreatList',
              href: 'https://greatlist.co/',
            }
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lauri3new/light-arrow',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Light Arrow.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/lauri3new/light-arrow-docs/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
