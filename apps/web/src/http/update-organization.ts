import { API } from '../lib/api-client'

interface UpdateOrganizationRequest {
	organizationSlug: string
	name: string
	domain?: string | null
	shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
	organizationSlug,
	name,
	domain,
	shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
	await API.put(`organizations/${organizationSlug}`, {
		json: { name, domain, shouldAttachUsersByDomain },
	})
}
