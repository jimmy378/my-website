module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'typescript-sort-keys',
        'sort-destructure-keys',
        'simple-import-sort',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'react/jsx-sort-props': [
            'error',
            {
                ignoreCase: false,
                noSortAlphabetically: false,
            },
        ],
        'react/prop-types': 'off',
        'react/sort-prop-types': [
            'error',
            {
                noSortAlphabetically: false,
            },
        ],
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'sort-destructure-keys/sort-destructure-keys': [
            2,
            { caseSensitive: false },
        ],
        'sort-keys': [
            'error',
            'asc',
            { caseSensitive: true, minKeys: 2, natural: false },
        ],
        'typescript-sort-keys/interface': 'error',
        'typescript-sort-keys/string-enum': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
