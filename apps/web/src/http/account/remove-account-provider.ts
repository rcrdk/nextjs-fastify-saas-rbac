import { API } from '@/lib/api-client'

interface RemoveAccountProviderRequest {
	provider: string
}

export async function removeAccountProvider({
	provider,
}: RemoveAccountProviderRequest) {
	const result = await API.delete(`users/providers/${provider}`)

	return result
}
