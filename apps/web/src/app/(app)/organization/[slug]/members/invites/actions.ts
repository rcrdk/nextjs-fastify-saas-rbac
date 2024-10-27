'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth'
import { createInvite } from '@/http/invites/create-invite'
import { revokeInvite } from '@/http/invites/revoke-invite'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { createInviteSchema } from '@/schema/create-invite-schema'

export async function revokeInviteAction(inviteId: string) {
	const currentOrganization = await getCurrentOrganization()

	await revokeInvite({
		organizationSlug: currentOrganization!,
		inviteId,
	})

	revalidateTag(`${currentOrganization}/invites`)
}

export async function createInviteAction(data: FormData) {
	const result = createInviteSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { email, role } = result.data
	const organization = await getCurrentOrganization()

	try {
		await createInvite({
			organizationSlug: organization!,
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
			message: errors.app.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: success.INVITE_SENT,
		errors: null,
	}
}
