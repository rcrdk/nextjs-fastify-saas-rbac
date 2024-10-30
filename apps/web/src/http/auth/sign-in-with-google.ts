import { API } from '@/lib/api-client'

interface SignInWithGoogleRequest {
	code: string
}

interface SignInWithGoogleResponse {
	token: string
}

export async function signInWithGoogle({ code }: SignInWithGoogleRequest) {
	const result = await API.post('sessions/google', {
		json: {
			code,
		},
	}).json<SignInWithGoogleResponse>()

	return result
}
