import { API } from '../lib/api-client'

export async function acceptInvite(inviteId: string) {
	await API.post(`invites/${inviteId}/accept`)
}
