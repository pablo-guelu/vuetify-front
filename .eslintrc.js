/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/script-indent': 'off',
    'vue/html-indent': 'off',
    'vue/trailing-comma': 'off',
    semi: 'off',
    'eol-last': 'off',
    'vue/html-self-closing': 'off',
    'vue/v-slot-style': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/first-attribute-line': 'off',
    'vue/attributes-order': 'off',
  },
}
