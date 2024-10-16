import { API } from '../lib/api-client'

interface RemoveMemberRequest {
	organization: string
	memberId: string
}

export async function removeMember({
	organization,
	memberId,
}: RemoveMemberRequest) {
	const result = await API.delete(
		`organization/${organization}/members/${memberId}`,
	)

	return result
}
