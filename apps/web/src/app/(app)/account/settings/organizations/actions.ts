'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { leaveOrganization } from '@/http/organizations/leave-organization'

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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'You just leave the organization',
		errors: null,
	}
}
