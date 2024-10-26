import { API } from '@/lib/api-client'

interface GetProjectsRequest {
	organizationSlug: string
}

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
			email: string
		} | null
	}[]
}

export async function getProjects({ organizationSlug }: GetProjectsRequest) {
	const result = await API.get(`organization/${organizationSlug}/projects`, {
		next: {
			tags: [`${organizationSlug}/projects`],
		},
	}).json<GetProjectsResponse>()

	return result
}
