module.exports = {
    "themeConfig": {
        "repo": "vuejs/vuepress",
        "nav": [
            {
                "text": "Home",
                "link": "/",
                "items": [
                    {
                        "text": "Chinese",
                        "link": "/language/chinese/"
                    },
                    {
                        "text": "Japanese",
                        "link": "/language/japanese/"
                    }
                ]
            },
            {
                "text": "Guide",
                "link": "/guide/"
            },
            {
                "text": "External",
                "link": "https://google.com"
            }
        ],
        "sidebar": [
            {
                "title": "add",
                "collapsable": false,
                "path": "/src/add/"
            }
        ]
    }
}