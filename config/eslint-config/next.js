/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: [
		'@rocketseat/eslint-config/next',
		'next/core-web-vitals',
		'next/typescript',
	],
	plugins: ['simple-import-sort'],
	rules: {
		'simple-import-sort/imports': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
			},
		],
	},
}
