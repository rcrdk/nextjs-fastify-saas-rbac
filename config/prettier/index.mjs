/** @typedef {import('prettier').Config} PrettierConfig */

/** @type PrettierConfig */
const config  = {
	plugins: ['prettier-plugin-tailwindcss'],
	printWidth: 50,
	tabWidth: 4,
	useTabs: true,
	semi: false,
	singleQuote: true,
	quoteProps: 'as-needed',
	jsxSingleQuote: false,
	trailingComma: 'es5',
	bracketSpacing: true,
	arrowParens: 'always',
	endOfLine: 'auto',
	bracketSameLine: false,
}

export default config