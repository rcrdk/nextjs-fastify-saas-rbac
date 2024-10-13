import { Role } from '@saas/auth'

import { API } from './api-client'

interface GetMembershipResponse {
	membership: {
		id: string
		role: Role
		organizationId: string
		userId: string
	}
}

export async function getMembership(organization: string) {
	const result = await API.get(
		`organizations/${organization}/membership`,
	).json<GetMembershipResponse>()

	return result
}
