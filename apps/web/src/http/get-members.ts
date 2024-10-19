import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface GetMembersRequest {
	organizationSlug: string
}

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

export async function getMembers({ organizationSlug }: GetMembersRequest) {
	const result = await API.get(`organization/${organizationSlug}/members`, {
		next: {
			tags: [`${organizationSlug}/members`],
		},
	}).json<GetMembersResponse>()

	return result
}
