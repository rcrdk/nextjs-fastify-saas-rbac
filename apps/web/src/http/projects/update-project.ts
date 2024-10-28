import { API } from '@/lib/api-client'

interface UpdateProjectRequest {
	organizationSlug: string
	projectId: string
	name: string
	description: string
}

type UpdateProjectResponse = void

export async function updateProject({
	organizationSlug,
	projectId,
	name,
	description,
}: UpdateProjectRequest): Promise<UpdateProjectResponse> {
	await API.put(`organization/${organizationSlug}/projects/${projectId}`, {
		json: {
			name,
			description,
		},
	})
}
