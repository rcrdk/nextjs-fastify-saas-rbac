import { API } from '@/lib/api-client'

interface VerifyEmailRequest {
	email: string
	password: string
	code: string
}

interface VerifyEmailResponse {
	token: string
}

export async function verifyEmailAndSignIn({
	email,
	password,
	code,
}: VerifyEmailRequest): Promise<VerifyEmailResponse> {
	const result = await API.post('users/verify-email', {
		json: {
			email,
			password,
			code,
		},
	}).json<VerifyEmailResponse>()

	return result
}
