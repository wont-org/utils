module.exports = {
  title: '@wont/utils 函数库',
  description:
    '@wont/utils is javascript library, written with typescript. supporting browser and node',
  base: '/utils/',
  themeConfig: {
    repo: 'https://github.com/wont-org/utils',
    lastUpdated: '最后更新时间',
    nav: [
      {
        text: '快速开始',
        link: '/common/quickstart',
      },
      {
        text: '开发指南',
        link: '/common/guide',
      },
      {
        text: '变更历史',
        link: '/common/CHANGELOG',
      },
      {
        text: '测试覆盖率',
        link: '/coverage/lcov-report/index',
      },
      {
        text: '其他个人作品',
        items: [
          {
            text: 'react组件库',
            link: 'https://wont-org.github.io/biz-ui',
          },
          {
            text: 'eslint-plugin-vue3-jsx',
            link: 'https://github.com/lk0606/lint/tree/master/packages/eslint-plugin-vue3-jsx',
          },
          {
            text: '库打包工具',
            link: 'https://github.com/wont-org/tools',
          },
          {
            text: 'antd可拖拽表格',
            link: 'https://github.com/wont-org/use-antd-resizable-header',
          },
          {
            text: 'vue3组件库',
            link: 'https://github.com/wont-org/vue3-el',
          },
          {
            text: 'vue3后台模板',
            link: 'https://github.com/wont-org/v3-backend-tpl',
          },
          {
            text: 'react脚手架',
            link: 'https://github.com/wont-org/cli',
          },
        ],
      },
    ],
    sidebar: [
      {
        title: '变更历史',
        collapsable: false,
        path: '/common/CHANGELOG',
      },
      '/common/code-commenting',
      '/common/guide',
      '/common/jest',
      '/common/quickstart',
      '/common/recommend',
      '/common/z-refer',
      {
        title: '函数API',
        sidebarDepth: 0,
        path: '',
        collapsable: true,
        children: [
          {
            title: 'arrayToObject',
            collapsable: false,
            path: '/src/arrayToObject',
          },
          {
            title: 'base64',
            collapsable: false,
            path: '/src/base64',
          },
          {
            title: 'compose',
            collapsable: false,
            path: '/src/compose',
          },
          {
            title: 'convertObjKeys',
            collapsable: false,
            path: '/src/convertObjKeys',
          },
          {
            title: 'curry',
            collapsable: false,
            path: '/src/curry',
          },
          {
            title: 'debounce',
            collapsable: false,
            path: '/src/debounce',
          },
          {
            title: 'formatOptions',
            collapsable: false,
            path: '/src/formatOptions',
          },
          {
            title: 'formatTime',
            collapsable: false,
            path: '/src/formatTime',
          },
          {
            title: 'formatTree',
            collapsable: false,
            path: '/src/formatTree',
          },
          {
            title: 'formatTreeSelectProps',
            collapsable: false,
            path: '/src/formatTreeSelectProps',
          },
          {
            title: 'get',
            collapsable: false,
            path: '/src/get',
          },
          {
            title: 'getDataType',
            collapsable: false,
            path: '/src/getDataType',
          },
          {
            title: 'getUrlParam',
            collapsable: false,
            path: '/src/getUrlParam',
          },
          {
            title: 'getUrlParams',
            collapsable: false,
            path: '/src/getUrlParams',
          },
          {
            title: 'getUrlSearch',
            collapsable: false,
            path: '/src/getUrlSearch',
          },
          {
            title: 'isFileName',
            collapsable: false,
            path: '/src/isFileName',
          },
          {
            title: 'objectToFormData',
            collapsable: false,
            path: '/src/objectToFormData',
          },
          {
            title: 'set',
            collapsable: false,
            path: '/src/set',
          },
          {
            title: 'throttle',
            collapsable: false,
            path: '/src/throttle',
          },
          {
            title: 'toFirstCase',
            collapsable: false,
            path: '/src/toFirstCase',
          },
          {
            title: 'validator',
            collapsable: false,
            path: '/src/validator',
          },
          {
            title: 'winOpen',
            collapsable: false,
            path: '/src/winOpen',
          },
        ],
      },
    ],
  },
  head: [
    [
      'script',
      {
        src: 'https://unpkg.com/@wont/utils',
      },
    ],
  ],
}
