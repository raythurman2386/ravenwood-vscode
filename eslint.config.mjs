import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default ts.config(
  {
    ignores: ["dist/**", "node_modules/**", "eslint.config.mjs"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
