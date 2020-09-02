module.exports = {
    "title": "@wont/utils 函数库",
    "description": "@wont/utils is javascript library, written with typescript. supporting browser and node",
    "base": "/utils/",
    "themeConfig": {
        "repo": "https://github.com/wont-org/utils",
        "lastUpdated": "最后更新时间",
        "nav": [
            {
                "text": "快速开始",
                "link": "/common/quickstart"
            },
            {
                "text": "开发指南",
                "link": "/common/guide"
            },
            {
                "text": "变更历史",
                "link": "/common/CHANGELOG"
            },
            {
                "text": "测试覆盖率",
                "link": "/coverage/lcov-report/index"
            }
        ],
        "sidebar": [
            {
                "title": "变更历史",
                "collapsable": false,
                "path": "/common/CHANGELOG"
            },
            "/common/code-commenting",
            "/common/guide",
            "/common/jest",
            "/common/quickstart",
            "/common/recommend",
            "/common/z-refer",
            {
                "title": "函数API",
                "sidebarDepth": 0,
                "path": "",
                "collapsable": true,
                "children": [
                    {
                        "title": "get",
                        "collapsable": false,
                        "path": "/src/get"
                    },
                    {
                        "title": "getUrlParam",
                        "collapsable": false,
                        "path": "/src/getUrlParam"
                    },
                    {
                        "title": "isMobile",
                        "collapsable": false,
                        "path": "/src/isMobile"
                    },
                    {
                        "title": "isNumber",
                        "collapsable": false,
                        "path": "/src/isNumber"
                    },
                    {
                        "title": "toFirstCase",
                        "collapsable": false,
                        "path": "/src/toFirstCase"
                    }
                ]
            }
        ]
    }
}
