import { API } from '@/lib/api-client'

interface CreateProjectRequest {
	organization: string
	name: string
	description: string
}

type CreateProjectResponse = void

export async function createProject({
	organization,
	name,
	description,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
	await API.post(`organization/${organization}/projects`, {
		json: { name, description },
	})
}
