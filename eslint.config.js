// eslint.config.js

const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const js = require("@eslint/js");

/** @type {import('eslint').FlatConfigArray} */
const config = [
    {
        files: ['src/**/*.js'],
        rules: {
            'semi': 'error',
            'no-unused-vars': 'error',
        },
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            'semi': 'warn',
            'prefer-const': 'error',
            'no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
            'no-unused-expressions': 'error',
            '@typescript-eslint/no-duplicate-enum-values': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-expressions': 'error',
            '@typescript-eslint/no-empty-function': 'error'
        },
    },
];

module.exports = config;
