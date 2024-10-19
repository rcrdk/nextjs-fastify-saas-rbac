import { API } from '../lib/api-client'

interface TransferOrganizationOwnershipRequest {
	organizationSlug: string
	transferToUserId: string
}

export async function transfererOrganizationOwnership({
	organizationSlug,
	transferToUserId,
}: TransferOrganizationOwnershipRequest) {
	console.log('organizationSlug', organizationSlug)
	console.log('transferToUserId', transferToUserId)

	const result = await API.patch(`organizations/${organizationSlug}/owner`, {
		json: {
			transferToUserId,
		},
	})

	return result
}
