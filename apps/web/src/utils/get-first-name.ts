export function getFirstName(string?: string | null, fallback?: string) {
	return string?.split(' ').at(0) ?? fallback
}
