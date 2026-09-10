const { fixupPluginRules } = require('@eslint/compat');
const ts = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const hooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-plugin-prettier');
const legacy = require('./.eslintrc.cjs');
const js = require('@eslint/js');
const globals = require('globals');

// Preserve the project's existing rule choices while using ESLint's flat config.
const rules = { ...legacy.rules };
for (const name of Object.keys(rules)) {
  if (name.startsWith('@typescript-eslint/') && !ts.rules[name.split('/')[1]]) delete rules[name];
}

module.exports = [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/docs/**', '**/.husky/**', '**/.vscode/**', '**/.idea/**', '**/.local/**', '**/bin/**', '**/service/**', '**/server/**', '**/src/mock/**', '**/@upack-kdfh@2.1.85/**'] },
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],
    languageOptions: { parser, globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } } },
    settings: legacy.settings,
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    plugins: { '@typescript-eslint': ts, react: fixupPluginRules(react), 'react-hooks': hooks, prettier },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...ts.configs['eslint-recommended'].overrides[0].rules,
      ...react.configs['jsx-runtime'].rules,
      ...require('eslint-config-prettier').rules,
      ...rules,
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      // These replace ban-types, which was disabled in the previous configuration.
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
];
