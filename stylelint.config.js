/** @type {import('stylelint').Config} */

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
      },
    ],
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'custom-property-empty-line-before': null,
  },
};
