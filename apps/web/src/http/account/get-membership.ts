import type { Role } from '@saas/auth'
import { redirect } from 'next/navigation'

import { API } from '@/lib/api-client'

interface GetMembershipRequest {
	organizationSlug: string
}

export interface GetMembershipItemResponse {
	id: string
	role: Role
	organizationId: string
	userId: string
}

interface GetMembershipResponse {
	membership: GetMembershipItemResponse
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
