module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'plugin:jest/recommended',
    ],
    plugins: ['@typescript-eslint', 'jest'],
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'never'],
        'max-len': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'no-console': process.env === 'development' ? 'on' : 'off',
        'class-methods-use-this': 0,
        'prefer-destructuring': 0,
        'no-eval': 0,
        'consistent-return': 0,
        'import/extensions': 0,
        'object-curly-newline': [
            'error',
            {
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 2,
                },
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 2,
                },
            },
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false,
            },
        ],
    },
}
