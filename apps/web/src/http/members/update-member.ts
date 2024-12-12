import type { Role } from '@saas/auth'

import { API } from '@/lib/api-client'

interface UpdateMemberRequest {
	organizationSlug: string
	memberId: string
	role: Role
}

export async function updateMember({
	organizationSlug,
	memberId,
	role,
}: UpdateMemberRequest) {
	const result = await API.put(
		`organization/${organizationSlug}/members/${memberId}`,
		{
			json: { role },
		},
	)

	return result
}
