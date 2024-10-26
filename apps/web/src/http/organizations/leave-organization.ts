import { API } from '@/lib/api-client'

interface LeaveOrganizationRequest {
	organizationSlug: string
}

export async function leaveOrganization({
	organizationSlug,
}: LeaveOrganizationRequest) {
	const result = await API.delete(`users/organizations/${organizationSlug}`)

	return result
}
