import { API } from '@/lib/api-client'

interface RequestNewPasswordRequest {
	email: string
}

type RequestNewPasswordResponse = void

export async function requestNewPassword({ email }: RequestNewPasswordRequest) {
	const result = await API.post('password/recover', {
		json: {
			email,
		},
	}).json<RequestNewPasswordResponse>()

	return result
}
