export function generateFilename(filename: string) {
	const parts = filename.split('.')
	const extension = parts.pop()?.toLocaleLowerCase()
	const name = parts.join('.')

	const slug = name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

	return extension ? `${slug}.${extension}` : slug
}
