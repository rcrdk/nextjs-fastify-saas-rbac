import { API } from '@/lib/api-client'

interface updateAccountPasswordRequest {
	currentPassword?: string | null
	newPassword: string
}

type updateAccountPasswordResponse = void

export async function updateAccountPassword({
	currentPassword,
	newPassword,
}: updateAccountPasswordRequest): Promise<updateAccountPasswordResponse> {
	await API.patch('users/passwords', {
		json: { currentPassword, password: newPassword },
	})
}
