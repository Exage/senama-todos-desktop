import { defineConfig } from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import prettierPlugin from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            js,
            react: pluginReact,
            prettier: prettierPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...pluginReact.configs.recommended.rules,
            "prettier/prettier": "error",
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        rules: {
            ...prettierConfig.rules,
        },
    },
])
