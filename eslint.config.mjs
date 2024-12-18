import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': ['error'],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
    },
  },
]
