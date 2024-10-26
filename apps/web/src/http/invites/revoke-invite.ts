import { API } from '@/lib/api-client'

interface RevokeInviteRequest {
	organizationSlug: string
	inviteId: string
}

export async function revokeInvite({
	organizationSlug,
	inviteId,
}: RevokeInviteRequest) {
	const result = await API.delete(
		`organization/${organizationSlug}/invites/${inviteId}`,
	)

	return result
}
