import { Role } from '@saas/auth'

import { API } from '../lib/api-client'

interface UpdateMemberRequest {
	organization: string
	memberId: string
	role: Role
}

export async function updateMember({
	organization,
	memberId,
	role,
}: UpdateMemberRequest) {
	const result = await API.put(
		`organization/${organization}/members/${memberId}`,
		{
			json: { role },
		},
	)

	return result
}
