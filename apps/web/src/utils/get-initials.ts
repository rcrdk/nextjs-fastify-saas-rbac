export function getInitials(name: string) {
	return name
		.split(' ')
		.map((word) => word[0].toUpperCase())
		.join('')
}
