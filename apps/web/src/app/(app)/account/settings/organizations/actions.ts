'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { leaveOrganization } from '@/http/organizations/leave-organization'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'

export async function leaveOrganizationAction(organizationSlug: string) {
	try {
		await leaveOrganization({
			organizationSlug,
		})

		revalidateTag('organizations')
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
		message: success.ORGANIZATION_LEAVE,
		errors: null,
	}
}
