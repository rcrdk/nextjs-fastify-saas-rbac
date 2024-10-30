import { API } from '@/lib/api-client'

interface ConnectGithubRequest {
	code: string
}

export async function connectGithub({ code }: ConnectGithubRequest) {
	const result = await API.post('users/accounts/github', {
		json: {
			code,
		},
	}).json()

	return result
}
