import type { Token } from '@/@types/tokens'
import { API } from '@/lib/api-client'

interface CheckEmailChangeResponse {
	token: {
		userId: string
		payload: string
		type: Token
		createdAt: string
	} | null
}

export async function checkEmailChange() {
	const result = await API.get('users/email', {
		next: {
			tags: ['account-email'],
		},
	}).json<CheckEmailChangeResponse>()

	return result
}
