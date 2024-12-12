import type { Role } from '@saas/auth'

import { API } from '@/lib/api-client'

interface CreateInviteRequest {
	organizationSlug: string
	email: string
	role: Role
}

type CreateInviteResponse = void

export async function createInvite({
	organizationSlug,
	email,
	role,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
	await API.post(`organization/${organizationSlug}/invites`, {
		json: { email, role },
	})
}
