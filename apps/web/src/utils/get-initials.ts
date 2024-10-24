export function getInitials(name: string) {
	return name
		.split(' ')
		.map((word) => (word.at(0) ? word[0].toUpperCase() : word))
		.join('')
}
