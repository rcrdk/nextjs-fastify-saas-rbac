import { API } from '@/lib/api-client'

interface CreateOrganizationRequest {
	name: string
	// domain?: string | null
	// shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponse = void

export async function createOrganization({
	name,
	// domain,
	// shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
	await API.post('organizations', {
		json: {
			name,
			// domain,
			// shouldAttachUsersByDomain
		},
	})
}
