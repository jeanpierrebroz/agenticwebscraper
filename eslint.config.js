import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: globals.browser,
      sourceType: 'module',
      ecmaVersion: 2020,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  stylistic.configs['recommended'],
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@stylistic/jsx-quotes': [2, 'prefer-single'],
      '@stylistic/brace-style': [2, '1tbs'],
    },
  },
  {
    settings: {
      react: {
        version: '19',
      },
    },
  },
]
