'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth'
import { createOrganization } from '@/http/organizations/create-organization'
import { updateOrganization } from '@/http/organizations/update-organization'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { formOrganizationSchema } from '@/schema/form-organization-schema'

export async function createOrganizationAction(data: FormData) {
	const result = formOrganizationSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { name } = result.data

	try {
		await createOrganization({
			name,
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
		message: success.ORGANIZATION_CREATE,
		errors: null,
	}
}

export async function updateOrganizationAction(data: FormData) {
	const currentOrganization = await getCurrentOrganization()
	const result = formOrganizationSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { name } = result.data

	try {
		await updateOrganization({
			organizationSlug: currentOrganization!,
			name,
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
		message: success.ORGANIZATION_UPDATE,
		errors: null,
	}
}
