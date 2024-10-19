import { API } from '../lib/api-client'

interface GetOrganizationRequest {
	organizationSlug: string
}

interface GetOrganizationResponse {
	organization: {
		id: string
		slug: string
		name: string
		domain: string | null
		shouldAttachUsersByDomain: boolean
		avatarUrl: string | null
		createdAt: string
		updatedAt: string
		ownerId: string
	}
}

export async function getOrganization({
	organizationSlug,
}: GetOrganizationRequest) {
	const result = await API.get(
		`organizations/${organizationSlug}`,
	).json<GetOrganizationResponse>()

	return result
}
