import type { Role } from '@saas/auth'

import { API } from '@/lib/api-client'

interface GetInvitesRequest {
	organizationSlug: string
}

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

export async function getInvites({ organizationSlug }: GetInvitesRequest) {
	const result = await API.get(`organization/${organizationSlug}/invites`, {
		next: {
			tags: [`${organizationSlug}/invites`],
		},
	}).json<GetInvitesResponse>()

	return result
}
