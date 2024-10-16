import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface CreateInviteRequest {
	organization: string
	email: string
	role: Role
}

type CreateInviteResponse = void

export async function createInvite({
	organization,
	email,
	role,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
	await API.post(`organization/${organization}/invites`, {
		json: { email, role },
	})
}
