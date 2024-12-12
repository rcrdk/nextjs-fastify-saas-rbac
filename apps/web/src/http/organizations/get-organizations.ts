import type { Role } from '@saas/auth'

import { API } from '@/lib/api-client'

export interface GetOrganizationsItemResponse {
	id: string
	name: string
	slug: string
	avatarUrl: string | null
	role: Role
}

interface GetOrganizationsResponse {
	organizations: GetOrganizationsItemResponse[]
}

export async function getOrganizations() {
	const result = await API.get('organizations', {
		next: {
			tags: ['organizations'],
		},
	}).json<GetOrganizationsResponse>()

	return result
}
