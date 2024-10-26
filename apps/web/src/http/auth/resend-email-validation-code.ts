import { API } from '@/lib/api-client'

interface ResendEmailValidationCodeRequest {
	email: string
}

type ResendEmailValidationCodeResponse = void

export async function resendEmailValidationCode({
	email,
}: ResendEmailValidationCodeRequest): Promise<ResendEmailValidationCodeResponse> {
	await API.post('users/resend-email-validation-code', {
		json: {
			email,
		},
	})
}
