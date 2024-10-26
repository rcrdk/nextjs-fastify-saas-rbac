import { API } from '@/lib/api-client'

interface RemoveMemberRequest {
	organizationSlug: string
	memberId: string
}

export async function removeMember({
	organizationSlug,
	memberId,
}: RemoveMemberRequest) {
	const result = await API.delete(
		`organization/${organizationSlug}/members/${memberId}`,
	)

	return result
}
