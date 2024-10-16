'use server'

import { Role, rolesSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

const inviteSchema = z.object({
	email: z.string().email('Enter a valid e-mail address.'),
	role: rolesSchema,
})

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

export async function revokeInviteAction(inviteId: string) {
	const currentOrganization = getCurrentOrganization()

	await revokeInvite({
		organization: currentOrganization!,
		inviteId,
	})

	revalidateTag(`${currentOrganization}/invites`)
}

export async function createInviteAction(data: FormData) {
	const result = inviteSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { email, role } = result.data
	const organization = getCurrentOrganization()!

	try {
		await createInvite({
			organization,
			email,
			role,
		})

		revalidateTag(`${organization}/invites`)
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
			message: 'Unexpected error, try again in a few minutes.',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Your invite was sent.',
		errors: null,
	}
}
