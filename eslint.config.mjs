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
    plugins: {
      prettier: prettierPlugin, // Prettierプラグインをオブジェクトとして定義
    },
    rules: {
      ...prettierConfig.rules, // Prettierの設定をESLintのルールとして適用
      'prettier/prettier': ['error'], // PrettierルールをESLintに適用
      semi: ['error', 'never'], // セミコロン禁止
      quotes: ['error', 'single'], // シングルクォーテーションを強制
    },
  },
]
