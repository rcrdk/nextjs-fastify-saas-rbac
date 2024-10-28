import { API } from '@/lib/api-client'

interface DeleteProjectRequest {
	organizationSlug: string
	projectId: string
}

export async function deleteProject({
	organizationSlug,
	projectId,
}: DeleteProjectRequest) {
	const result = await API.delete(
		`organization/${organizationSlug}/projects/${projectId}`,
	).json()

	return result
}
