import { API } from './api-client'

interface GetOrganizationsResponse {
	organizations: {
		id: string
		name: string
		slug: string
		avatarUrl: string | null
		role: 'ADMIN' | 'MEMBER' | 'BILLING'
	}[]
}

export async function getOrganizations() {
	const result = await API.get('organizations').json<GetOrganizationsResponse>()

	return result
}
