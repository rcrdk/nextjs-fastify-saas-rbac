import { API } from '../lib/api-client'

interface RevokeInviteRequest {
	organization: string
	inviteId: string
}

export async function revokeInvite({
	organization,
	inviteId,
}: RevokeInviteRequest) {
	const result = await API.delete(
		`organization/${organization}/invites/${inviteId}`,
	)

	return result
}
