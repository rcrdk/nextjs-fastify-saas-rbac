import { API } from '@/lib/api-client'

interface UpdateOrganizationRequest {
	organizationSlug: string
	name: string
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
	organizationSlug,
	name,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
	await API.put(`organizations/${organizationSlug}`, {
		json: {
			name,
		},
	})
}
