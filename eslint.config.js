import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import pluginTailwindcss from 'eslint-plugin-better-tailwindcss'
import pluginReactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'

export default antfu({
  react: true,
  formatters: true,
  jsx: true,
  typescript: true,
  ignores: ['**/routeTree.gen.ts'],
  plugins: {
    'better-tailwindcss': pluginTailwindcss,
    'react-you-might-not-need-an-effect': pluginReactYouMightNotNeedAnEffect,
  },
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    ...pluginTailwindcss.configs['recommended-warn'].rules,
    ...pluginReactYouMightNotNeedAnEffect.configs.recommended.rules,
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/app/styles/app.css',
    },
  },
}, ...pluginRouter.configs['flat/recommended'], ...pluginQuery.configs['flat/recommended'])
