import { API } from '../lib/api-client'

interface ShutdownOrganizationRequest {
	organization: string
}

export async function shutdownOrganization({
	organization,
}: ShutdownOrganizationRequest) {
	const result = await API.delete(`organizations/${organization}`)

	return result
}
