export default {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(🎨|📰|✨|📝|💄|🐎|📚|🐛|🚑|🔥|🚜|🔨|💎|🔖|🚀|♻️|📦|📦️|✅)\s*\[\s*#(\d+)\s*\]\s*(Feat|Fix|Chore|Style|Docs|Refactor|Test):\s(.+)$/u,
      headerCorrespondence: ['emoji', 'issue', 'type', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', ['Feat', 'Fix', 'Chore', 'Style', 'Docs', 'Refactor', 'Test']],
    'type-case': [2, 'always', 'pascal-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
