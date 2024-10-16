import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface GetMembersResponse {
	members: {
		memberId: string
		userId: string
		role: Role
		name: string | null
		email: string
		avatarUrl: string | null
	}[]
}

export async function getMembers(organization: string) {
	const result = await API.get(`organization/${organization}/members`, {
		next: {
			tags: [`${organization}/members`],
		},
	}).json<GetMembersResponse>()

	return result
}
