import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";
import path from "path";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // Ignore build and config files
  {
    ignores: [
      "**/dist/*",
      "**/coverage/*",
      "**/.github/*",
      "eslint.config.mjs",
      "jest.config.ts",
    ],
  },

  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // TypeScript rules for src files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(), 
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/typedef": "error",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Relax rules only for test files
  {
    files: ["test/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/typedef": "off",
    },
  },

  // Jest config exceptions
  {
    files: ["jest.config.js"],
    languageOptions: {
      globals: {
        module: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  // API service files overrides
  {
    files: ["src/api/v1/service/**/*.ts"],
    rules: {
      "no-useless-catch": "off",
    },
  },
];
