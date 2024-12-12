import type { AccountProviders } from '@/@types/account-providers'
import { API } from '@/lib/api-client'

interface GetProfileResponse {
	user: {
		id: string
		name: string | null
		email: string
		avatarUrl: string | null
		passwordHash: boolean
		accounts: {
			id: string
			provider: AccountProviders
			createdAt: string
		}[]
	}
}

export async function getProfile() {
	const result = await API.get('profile', {
		next: {
			tags: ['get-profile'],
		},
	}).json<GetProfileResponse>()

	return result
}
