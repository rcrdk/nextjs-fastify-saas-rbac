import { API } from '@/lib/api-client'

interface updateAccountRequest {
	name: string
	email: string
}

type updateAccountResponse = void

export async function updateAccount({
	name,
	email,
}: updateAccountRequest): Promise<updateAccountResponse> {
	await API.put('users', {
		json: { name, email },
	})
}
