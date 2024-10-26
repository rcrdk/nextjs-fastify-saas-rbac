import { API } from '@/lib/api-client'

interface RemoveOrganizationRequest {
	organizationSlug: string
}

export async function removeOrganizationDomain({
	organizationSlug,
}: RemoveOrganizationRequest) {
	await API.delete(`organization/${organizationSlug}/domain`)
}
