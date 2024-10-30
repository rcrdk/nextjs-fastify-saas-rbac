import { API } from '@/lib/api-client'

interface ConnectGoogleRequest {
	code: string
}

export async function connectGoogle({ code }: ConnectGoogleRequest) {
	const result = await API.post('users/accounts/google', {
		json: {
			code,
		},
	}).json()

	return result
}
