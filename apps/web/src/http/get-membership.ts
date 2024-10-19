import { Role } from '@saas/auth'
import { redirect } from 'next/navigation'

import { API } from '../lib/api-client'

interface GetMembershipRequest {
	organizationSlug: string
}

interface GetMembershipResponse {
	membership: {
		id: string
		role: Role
		organizationId: string
		userId: string
	}
}

export async function getMembership({
	organizationSlug,
}: GetMembershipRequest) {
	try {
		const result = await API.get(
			`organizations/${organizationSlug}/membership`,
		).json<GetMembershipResponse>()

		return result
	} catch {}

	redirect('/')
}
