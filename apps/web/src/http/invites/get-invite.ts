import type { Role } from '@saas/auth'

import { API } from '@/lib/api-client'

interface GetInviteRequest {
	inviteId: string
}

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
			email: string
		} | null
		organization: {
			name: string
		}
	}
}

export async function getInvite({ inviteId }: GetInviteRequest) {
	const result = await API.get(`invites/${inviteId}`).json<GetInviteResponse>()

	return result
}
