'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
	const currentOrganization = getCurrentOrganization()

	await removeMember({
		organization: currentOrganization!,
		memberId,
	})

	revalidateTag(`${currentOrganization}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
	const currentOrganization = getCurrentOrganization()

	await updateMember({
		organization: currentOrganization!,
		memberId,
		role,
	})

	revalidateTag(`${currentOrganization}/members`)
}
