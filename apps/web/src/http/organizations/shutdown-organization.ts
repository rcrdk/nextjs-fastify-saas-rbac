import { API } from '@/lib/api-client'

interface ShutdownOrganizationRequest {
	organizationSlug: string
}

export async function shutdownOrganization({
	organizationSlug,
}: ShutdownOrganizationRequest) {
	const result = await API.delete(`organizations/${organizationSlug}`)

	return result
}
