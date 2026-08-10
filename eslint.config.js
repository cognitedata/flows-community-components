import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const sharedRules = {
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        ['sibling', 'index'],
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
  'no-only-tests/no-only-tests': 'error',
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      trailingComma: 'es5',
      arrowParens: 'always',
      endOfLine: 'auto',
    },
  ],
  quotes: ['error', 'single', { avoidEscape: true }],
};

const noUnusedVarsOptions = {
  argsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
  varsIgnorePattern: '^_',
  ignoreRestSiblings: true,
};

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.min.js',
      'pnpm-lock.yaml',
    ],
  },
  prettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      import: importPlugin,
      'no-only-tests': noOnlyTestsPlugin,
    },
    rules: sharedRules,
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', noUnusedVarsOptions],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': ['error', noUnusedVarsOptions],
      'no-unused-vars': 'off',
    },
  }
);
