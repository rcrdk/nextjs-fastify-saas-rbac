import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface GetInviteResponse {
	invite: {
		id: string
		email: string
		role: Role
		createdAt: string
		author: {
			id: string
			name: string | null
			avatarUrl: string | null
		} | null
		organization: {
			name: string
		}
	}
}

export async function getInvite(invite: string) {
	const result = await API.get(`invites/${invite}`).json<GetInviteResponse>()

	return result
}
