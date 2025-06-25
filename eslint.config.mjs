import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
    },
    plugins: ['@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
  }
];

export default eslintConfig;
