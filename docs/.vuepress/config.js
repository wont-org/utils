
// import packageJson from '../../package.json'

module.exports = {
  // title: packageJson.name,
  themeConfig: {
    repo: 'vuejs/vuepress',
    nav: [
      { 
        text: 'Home', link: '/',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      '/common/guide',
      '/common/quickstart',
      '/src/add',
    ],
  }
}