const eslintrc = {
    parser: '@typescript-eslint/parser', // 使用 ts 解析器
    extends: [
        'eslint:recommended', // eslint 推荐规则
        'plugin:@typescript-eslint/recommended', // ts 推荐规则
    ],
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false,
            },
        ],
    }, // 自定义
}

module.exports = eslintrc
