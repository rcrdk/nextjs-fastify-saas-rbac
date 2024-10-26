import { API } from '@/lib/api-client'

interface RecoverPasswordRequest {
	code: string
	email: string
	password: string
}

type RecoverPasswordResponse = void

export async function recoverPassword({
	code,
	email,
	password,
}: RecoverPasswordRequest) {
	const result = await API.post('password/reset', {
		json: {
			code,
			email,
			password,
		},
	}).json<RecoverPasswordResponse>()

	return result
}
