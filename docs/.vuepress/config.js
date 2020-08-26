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
                "link": "/docs/CHANGELOG"
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
            }
        ]
    }
}