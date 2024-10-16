import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface GetInvitesResponse {
	invites: {
		id: string
		email: string
		role: Role
		createdAt: string
		author: {
			id: string
			name: string | null
		} | null
	}[]
}

export async function getInvites(organization: string) {
	const result = await API.get(`organization/${organization}/invites`, {
		next: {
			tags: [`${organization}/invites`],
		},
	}).json<GetInvitesResponse>()

	return result
}
