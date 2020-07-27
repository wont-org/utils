module.exports = {
    themeConfig: {
        repo: 'https://github.com/zero-org/zero-utils',
        lastUpdated: '最后更新时间',
        nav: [
            {
                text: 'Home',
                link: '/',
                items: [
                    {
                        text: 'Chinese',
                        link: '/language/chinese/',
                    },
                    {
                        text: 'Japanese',
                        link: '/language/japanese/',
                    },
                ],
            },
            {
                text: 'Guide',
                link: '/docs/CHANGELOG',
            },
            {
                text: 'External',
                link: 'https://google.com',
            },
        ],
        sidebar: [
            {
                title: '变更历史',
                collapsable: false,
                path: '/common/CHANGELOG',
            },
            '/common/guide',
            '/common/quickstart',
            {
                title: 'add',
                collapsable: false,
                path: '/src/add',
            },
        ],
    },
}
