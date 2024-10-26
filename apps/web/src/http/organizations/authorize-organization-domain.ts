import { API } from '@/lib/api-client'

interface AuthorizeOrganizationAdminRequest {
	organizationSlug: string
	domain: string
	shouldAttachUsersByDomain: boolean
}

export async function authorizeOrganizationDomain({
	organizationSlug,
	domain,
	shouldAttachUsersByDomain,
}: AuthorizeOrganizationAdminRequest) {
	await API.post(`organization/${organizationSlug}/domain`, {
		json: {
			domain,
			shouldAttachUsersByDomain,
		},
	})
}
