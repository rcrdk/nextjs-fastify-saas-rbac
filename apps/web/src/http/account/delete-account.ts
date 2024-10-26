import { API } from '@/lib/api-client'

type DeleteAccountResponse = void

export async function deleteAccount(): Promise<DeleteAccountResponse> {
	await API.delete('users')
}
