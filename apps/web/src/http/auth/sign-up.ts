import { API } from '@/lib/api-client'

interface SignUpRequest {
	name: string
	email: string
	password: string
}

type SignUpResponse = void

export async function signUp({
	name,
	email,
	password,
}: SignUpRequest): Promise<SignUpResponse> {
	await API.post('users', {
		json: { name, email, password },
	})
}
