import { API } from '@/lib/api-client'

interface GetProjectRequest {
	organizationSlug: string
	projectSlug: string
}

export interface GetProjectItemResponse {
	description: string
	id: string
	name: string
	slug: string
	avatarUrl: string | null
	organizationId: string
	createdAt: string
	updatedAt: string
	ownerId: string
	owner: {
		id: string
		name: string | null
		avatarUrl: string | null
		email: string
	} | null
}

interface GetProjectResponse {
	project: GetProjectItemResponse
}

export async function getProject({
	organizationSlug,
	projectSlug,
}: GetProjectRequest) {
	const result = await API.get(
		`organization/${organizationSlug}/projects/${projectSlug}`,
	).json<GetProjectResponse>()

	return result
}
