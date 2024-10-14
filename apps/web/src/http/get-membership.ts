import { Role } from '@saas/auth'
import { redirect } from 'next/navigation'

import { API } from '../lib/api-client'

interface GetMembershipResponse {
	membership: {
		id: string
		role: Role
		organizationId: string
		userId: string
	}
}

export async function getMembership(organization: string) {
	try {
		const result = await API.get(
			`organizations/${organization}/membership`,
		).json<GetMembershipResponse>()

		return result
	} catch {}

	redirect('/')
}
