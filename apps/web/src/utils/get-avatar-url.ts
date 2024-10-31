// import { createHash } from 'node:crypto'
import { env } from '@saas/env'
import { MD5 } from 'crypto-js'

/**
 * Get a avatar with a fallback from Gravatar:
 * @param avatarUrl provide a custom avatar url.
 * @param gravatarEmail provide an email to search for an avatar on Gravatar.
 * @returns an avatar url or a Gravatar fallback.
 */
export function getAvatarUrl(
	avatarUrl?: string | null,
	gravatarEmail?: string,
) {
	if (avatarUrl)
		return avatarUrl.replace('{AWS}', env.NEXT_PUBLIC_CLOUDFLARE_URL)

	if (gravatarEmail) {
		// const hashedEmail = createHash('md5').update(gravatarEmail).digest('hex')
		const hashedEmail = MD5(gravatarEmail).toString()

		return `https://www.gravatar.com/avatar/${hashedEmail}?d=404`
	}

	return avatarUrl ?? undefined
}
