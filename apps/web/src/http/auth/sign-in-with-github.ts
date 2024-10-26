import { API } from '@/lib/api-client'

interface SignInWithGithubRequest {
	code: string
}

interface SignInWithGithubResponse {
	token: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
	const result = await API.post('sessions/github', {
		json: {
			code,
		},
	}).json<SignInWithGithubResponse>()

	return result
}
