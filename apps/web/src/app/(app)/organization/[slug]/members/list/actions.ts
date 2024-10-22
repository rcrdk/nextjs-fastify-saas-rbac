'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth'
import { removeMember } from '@/http/remove-member'
import {
	transfererOrganizationOwnership,
	TransferOwnershipActions,
} from '@/http/transfer-organization-ownership'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
	const currentOrganization = await getCurrentOrganization()

	await removeMember({
		organizationSlug: currentOrganization!,
		memberId,
	})

	revalidateTag(`${currentOrganization}/members`)
}

export async function transferOrganizationOwnershipAction(
	userId: string,
	action: TransferOwnershipActions,
) {
	const currentOrganization = await getCurrentOrganization()

	await transfererOrganizationOwnership({
		organizationSlug: currentOrganization!,
		transferToUserId: userId,
		action,
	})

	if (action === 'LEAVE') {
		redirect('/')
	}
}

export async function updateMemberAction(memberId: string, role: Role) {
	const currentOrganization = await getCurrentOrganization()

	await updateMember({
		organizationSlug: currentOrganization!,
		memberId,
		role,
	})

	revalidateTag(`${currentOrganization}/members`)
}
