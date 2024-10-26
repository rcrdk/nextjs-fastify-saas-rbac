import { API } from '@/lib/api-client'

interface GetOrganizationRequest {
	organizationSlug: string
}

export interface GetOrganizationItemRequest {
	id: string
	slug: string
	name: string
	domain: string | null
	domainValidationId: string | null
	domainValidatedAt: string | null
	shouldAttachUsersByDomain: boolean
	avatarUrl: string | null
	createdAt: string
	updatedAt: string
	ownerId: string
}

interface GetOrganizationResponse {
	organization: GetOrganizationItemRequest
}

export async function getOrganization({
	organizationSlug,
}: GetOrganizationRequest) {
	const result = await API.get(`organizations/${organizationSlug}`, {
		next: {
			tags: [`organizations/${organizationSlug}`],
		},
	}).json<GetOrganizationResponse>()

	return result
}
