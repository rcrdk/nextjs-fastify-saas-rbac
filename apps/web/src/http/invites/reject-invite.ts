import { API } from '@/lib/api-client'

interface RejectInviteRequest {
	inviteId: string
}

export async function rejectInvite({ inviteId }: RejectInviteRequest) {
	await API.post(`invites/${inviteId}/reject`)
}
