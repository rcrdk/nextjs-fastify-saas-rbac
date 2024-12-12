'use server'

import type { Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth'
import { removeMember } from '@/http/members/remove-member'
import { updateMember } from '@/http/members/update-member'
import type { TransferOwnershipActions } from '@/http/organizations/transfer-organization-ownership'
import { transfererOrganizationOwnership } from '@/http/organizations/transfer-organization-ownership'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'

export async function removeMemberAction(memberId: string) {
	const currentOrganization = await getCurrentOrganization()

	try {
		await removeMember({
			organizationSlug: currentOrganization!,
			memberId,
		})

		revalidateTag(`${currentOrganization}/members`)
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()

			return {
				success: false,
				message,
				errors: null,
			}
		}

		console.error(error)

		return {
			success: false,
			message: errors.app.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: success.MEMBER_REMOVED,
		errors: null,
	}
}

export async function transferOrganizationOwnershipAction(
	userId: string,
	action: TransferOwnershipActions,
) {
	const currentOrganization = await getCurrentOrganization()

	try {
		await transfererOrganizationOwnership({
			organizationSlug: currentOrganization!,
			transferToUserId: userId,
			action,
		})

		revalidateTag(`${currentOrganization}/members`)
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()

			return {
				success: false,
				message,
				errors: null,
			}
		}

		console.error(error)

		return {
			success: false,
			message: errors.app.UNEXPECTED,
			errors: null,
		}
	}

	if (action === 'LEAVE') {
		const cookieStore = await cookies()

		cookieStore.set(
			'@SAAS:transferedOrganization',
			success.ORGANIZATION_TRANSFER_LEAVE,
			{
				expires: new Date().getTime() + (60 * 1000) / 6, // 10s
			},
		)

		redirect('/')
	}

	return {
		success: true,
		message: success.ORGANIZATION_TRANSFER_NOT_LEAVE,
		errors: null,
	}
}

export async function updateMemberAction(memberId: string, role: Role) {
	const currentOrganization = await getCurrentOrganization()

	try {
		await updateMember({
			organizationSlug: currentOrganization!,
			memberId,
			role,
		})

		revalidateTag(`${currentOrganization}/members`)
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()

			return {
				success: false,
				message,
				errors: null,
			}
		}

		console.error(error)

		return {
			success: false,
			message: errors.app.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: success.MEMBER_UPDATED,
		errors: null,
	}
}
