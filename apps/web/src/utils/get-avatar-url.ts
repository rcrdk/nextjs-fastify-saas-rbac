import { createHash } from 'node:crypto'

/**
 * Get a avatar with a fallback from Gravatar:
 * @param avatarUrl provide a custom avatar url.
 * @param email provide an email to search for an avatar on Gravatar.
 * @returns an avatar url or a Gravatar fallback.
 */
export function getAvatarUrl(avatarUrl: string | null, email: string) {
	if (avatarUrl) return avatarUrl

	const hashedEmail = createHash('md5').update(email).digest('hex')

	return `https://www.gravatar.com/avatar/${hashedEmail}?d=404`
}
