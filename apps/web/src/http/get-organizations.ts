import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface GetOrganizationsResponse {
	organizations: {
		id: string
		name: string
		slug: string
		avatarUrl: string | null
		role: Role
	}[]
}

export async function getOrganizations() {
	const result = await API.get('organizations', {
		next: {
			tags: ['organizations'],
		},
	}).json<GetOrganizationsResponse>()

	return result
}
