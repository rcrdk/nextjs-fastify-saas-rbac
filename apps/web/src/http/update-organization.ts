import { API } from '../lib/api-client'

interface UpdateOrganizationRequest {
	organization: string
	name: string
	domain?: string | null
	shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
	organization,
	name,
	domain,
	shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
	await API.put(`organizations/${organization}`, {
		json: { name, domain, shouldAttachUsersByDomain },
	})
}
