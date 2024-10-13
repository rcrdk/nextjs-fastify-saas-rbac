import { API } from './api-client'

interface GetProfileResponse {
	user: {
		id: string
		name: string | null
		email: string
		avatarUrl: string | null
	}
}

export async function getProfile() {
	const result = await API.get('profile').json<GetProfileResponse>()

	return result
}
