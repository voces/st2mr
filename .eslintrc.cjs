module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	plugins: ["simple-import-sort"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
	],
	rules: {
		"arrow-body-style": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
	},
};