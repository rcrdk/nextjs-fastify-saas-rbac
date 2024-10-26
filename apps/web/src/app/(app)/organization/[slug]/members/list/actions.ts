'use server'

import { Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth'
import { removeMember } from '@/http/members/remove-member'
import { updateMember } from '@/http/members/update-member'
import {
	transfererOrganizationOwnership,
	TransferOwnershipActions,
} from '@/http/organizations/transfer-organization-ownership'

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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Member removed from organization',
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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	if (action === 'LEAVE') {
		const cookieStore = await cookies()

		cookieStore.set(
			'@SAAS:transferedOrganization',
			'The membership transfer is completed and you leave the organization.',
			{
				// eslint-disable-next-line prettier/prettier
				expires: new Date().getTime() + ((60 * 1000) / 4), // 15s
			},
		)

		redirect('/')
	}

	return {
		success: true,
		message:
			'The transfer organization is completed and your membership was changed to regular member.',
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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Member role updated',
		errors: null,
	}
}
