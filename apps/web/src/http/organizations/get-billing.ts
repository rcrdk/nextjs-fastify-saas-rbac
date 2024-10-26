import { API } from '@/lib/api-client'

interface GetOrganizationBillingRequest {
	organization: string
}

interface GetOrganizationBillingResponse {
	billing: {
		seats: {
			amount: number
			unit: number
			price: number
		}
		projects: {
			amount: number
			unit: number
			price: number
		}
		total: number
	}
}

export async function getOrganizationBilling({
	organization,
}: GetOrganizationBillingRequest) {
	const result = await API.get(
		`organizations/${organization}/billing`,
	).json<GetOrganizationBillingResponse>()

	return result
}
