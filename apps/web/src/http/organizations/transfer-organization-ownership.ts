import { API } from '@/lib/api-client'

export type TransferOwnershipActions = 'UPDATE_ROLE' | 'LEAVE'

interface TransferOrganizationOwnershipRequest {
	organizationSlug: string
	transferToUserId: string
	action: TransferOwnershipActions
}

export async function transfererOrganizationOwnership({
	organizationSlug,
	transferToUserId,
	action,
}: TransferOrganizationOwnershipRequest) {
	const result = await API.patch(`organizations/${organizationSlug}/owner`, {
		json: {
			transferToUserId,
			action,
		},
	})

	return result
}
