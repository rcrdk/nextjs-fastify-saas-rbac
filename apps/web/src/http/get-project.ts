import { API } from '../lib/api-client'

interface GetProjectRequest {
	organization: string
	project: string
}

interface GetProjectResponse {
	project: {
		description: string
		id: string
		name: string
		slug: string
		avatarUrl: string | null
		organizationId: string
		createdAt: string
		updatedAt: string
		owner: {
			id: string
			name: string | null
			avatarUrl: string | null
		}
	}
}

export async function getProject({ organization, project }: GetProjectRequest) {
	const result = await API.get(
		`organization/${organization}/projects/${project}`,
	).json<GetProjectResponse>()

	return result
}
