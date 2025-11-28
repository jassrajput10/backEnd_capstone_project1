import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";
import path from "path";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      "**/dist/*",
      "**/coverage/*",
      "**/.github/*",
      "eslint.config.mjs",
      "jest.config.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/typedef": "error",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["test/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/typedef": "off",
    },
  },
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
  {
    files: ["src/api/v1/service/**/*.ts"], 
    rules: {
      "no-useless-catch": "off",
    },
  },
];