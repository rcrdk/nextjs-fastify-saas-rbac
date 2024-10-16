import { API } from '../lib/api-client'

export async function rejectInvite(inviteId: string) {
	await API.post(`invites/${inviteId}/reject`)
}
