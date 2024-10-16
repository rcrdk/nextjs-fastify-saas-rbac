import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface GetPendingInvitesResponse {
	invites: {
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
	}[]
}

export async function getPendingInvites() {
	const result = await API.get(`pending-invites`, {
		next: {
			tags: ['pending-invites'],
		},
	}).json<GetPendingInvitesResponse>()

	return result
}
