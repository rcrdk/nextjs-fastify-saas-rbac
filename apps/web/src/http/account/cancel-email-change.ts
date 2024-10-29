import { API } from '@/lib/api-client'

export async function cancelEmailChange() {
	const result = await API.delete('users/email').json()

	return result
}
