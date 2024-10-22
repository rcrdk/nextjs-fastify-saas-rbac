'use server'

import { rolesSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth'
import { createInvite } from '@/http/create-invite'
import { revokeInvite } from '@/http/revoke-invite'

const inviteSchema = z.object({
	email: z.string().email('Enter a valid e-mail address.'),
	role: rolesSchema,
})

export async function revokeInviteAction(inviteId: string) {
	const currentOrganization = await getCurrentOrganization()

	await revokeInvite({
		organizationSlug: currentOrganization!,
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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Your invite was sent',
		errors: null,
	}
}
