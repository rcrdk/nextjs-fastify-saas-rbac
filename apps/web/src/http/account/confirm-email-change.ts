import { API } from '@/lib/api-client'

interface ConfirmEmailChangeRequest {
	code: string
}

export async function confirmEmailChange({ code }: ConfirmEmailChangeRequest) {
	const result = await API.patch('users/email', {
		json: {
			code,
		},
	}).json()

	return result
}
