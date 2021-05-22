export default {
    // http://eslint.org/docs/user-guide/configuring#extending-configuration-files
    extends: [
        'eslint:recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],

    // http://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        browser: true,
        es2020: true,
        node: true,
    },

    // http://eslint.org/docs/user-guide/configuring#specifying-parser-options
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },

    // http://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin
    plugins: [
        // https://github.com/babel/eslint-plugin-babel#readme
        'babel',
        // https://github.com/yannickcr/eslint-plugin-react#recommended
        'react',
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#usage
        'jsx-a11y',
    ],

    // https://eslint.org/docs/user-guide/configuring#adding-shared-settings
    settings: {
        // https://github.com/yannickcr/eslint-plugin-react#recommended
        react: {
            version: 'detect',
        },
    },

    // http://eslint.org/docs/rules/
    rules: {
        // http://eslint.org/docs/rules/#variables
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/no-noninteractive-tabindex': [2, { tags: ['div'] }],

        // https://github.com/yannickcr/eslint-plugin-react
        // 'react/jsx-closing-bracket-location': [ 2, 'tag-aligned' ],
        // 'react/jsx-closing-tag-location': 2,
        // 'react/jsx-curly-spacing': [ 2, { when: 'always' } ],
        // 'react/jsx-indent': [ 2, 2, {
        //     checkAttributes: true,
        //     indentLogicalExpressions: true,
        // } ],
        // 'react/jsx-indent-props': [ 2, 2 ],
        // 'react/jsx-wrap-multilines': [ 2, {
        //     declaration: 'parens-new-line',
        //     assignment: 'parens-new-line',
        //     return: 'parens-new-line',
        //     arrow: 'parens-new-line',
        //     condition: 'ignore',
        //     logical: 'ignore',
        //     prop: 'parens-new-line',
        // } ],
    },
};
// module.exports = {

//     // http://eslint.org/docs/user-guide/configuring#extending-configuration-files
//     extends: [
//         'eslint:recommended',
//         'plugin:jsx-a11y/recommended',
//         'plugin:react/recommended',
//         'plugin:react-hooks/recommended',
//         'prettier',
//     ],

//     // http://eslint.org/docs/user-guide/configuring#specifying-environments
//     env: {
//         browser: true,
//         es2020: true,
//         node: true,
//     },

//     // http://eslint.org/docs/user-guide/configuring#specifying-parser-options
//     parserOptions: {
//         ecmaVersion: 2020,
//         ecmaFeatures: {
//             jsx: true,
//         },
//         sourceType: 'module',
//     },

//     // http://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin
//     plugins: [
//         // https://github.com/babel/eslint-plugin-babel#readme
//         'babel',
//         // https://github.com/yannickcr/eslint-plugin-react#recommended
//         'react',
//         // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#usage
//         'jsx-a11y',
//     ],

//     // https://eslint.org/docs/user-guide/configuring#adding-shared-settings
//     settings: {
//         // https://github.com/yannickcr/eslint-plugin-react#recommended
//         react: {
//             version: 'detect',
//         },
//     },

//     // http://eslint.org/docs/rules/
//     rules: {

//         // http://eslint.org/docs/rules/#variables
//         'no-unused-vars': [
//             2,
//             {
//                 vars: 'all',
//                 args: 'none',
//                 ignoreRestSiblings: true,
//             },
//         ],

//         // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
//         'jsx-a11y/anchor-is-valid': 0,
//         'jsx-a11y/no-noninteractive-tabindex': [ 2, { tags: [ 'div' ] } ],

//         // https://github.com/yannickcr/eslint-plugin-react
//         // 'react/jsx-closing-bracket-location': [ 2, 'tag-aligned' ],
//         // 'react/jsx-closing-tag-location': 2,
//         // 'react/jsx-curly-spacing': [ 2, { when: 'always' } ],
//         // 'react/jsx-indent': [ 2, 2, {
//         //     checkAttributes: true,
//         //     indentLogicalExpressions: true,
//         // } ],
//         // 'react/jsx-indent-props': [ 2, 2 ],
//         // 'react/jsx-wrap-multilines': [ 2, {
//         //     declaration: 'parens-new-line',
//         //     assignment: 'parens-new-line',
//         //     return: 'parens-new-line',
//         //     arrow: 'parens-new-line',
//         //     condition: 'ignore',
//         //     logical: 'ignore',
//         //     prop: 'parens-new-line',
//         // } ],
//     },
// };
