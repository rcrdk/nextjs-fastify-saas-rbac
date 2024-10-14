import { API } from '../lib/api-client'

interface GetProjectsResponse {
	projects: {
		description: string
		slug: string
		id: string
		name: string
		avatarUrl: string | null
		organizationId: string
		createdAt: string
		updatedAt: string
		owner: {
			id: string
			name: string | null
			avatarUrl: string | null
		}
	}[]
}

export async function getProjects(organization: string) {
	const result = await API.get(
		`organization/${organization}/projects`,
	).json<GetProjectsResponse>()

	return result
}
