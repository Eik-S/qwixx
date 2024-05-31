// @ts-check

// @ts-expect-error 7016
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
// @ts-expect-error 7016
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  { ignores: ['build/**', 'node_modules/**', 'public/**'] },
)
