import { API } from '../../lib/api-client'

interface AcceptInviteRequest {
	inviteId: string
}

export async function acceptInvite({ inviteId }: AcceptInviteRequest) {
	await API.post(`invites/${inviteId}/accept`)
}
