import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";

export default defineConfig(
  globalIgnores(["dist/**", ".astro/**", "node_modules/**", ".eslintcache"]),
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...ts.configs.recommended],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: { parserOptions: { parser: ts.parser } },
    plugins: { "@typescript-eslint": ts.plugin },
    rules: { ...ts.configs.recommended[2].rules },
  },
  prettier,
);
