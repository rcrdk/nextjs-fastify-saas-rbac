'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth'
import { authorizeOrganizationDomain } from '@/http/organizations/authorize-organization-domain'
import { removeOrganizationDomain } from '@/http/organizations/remove-organization-domain'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { authorizeOrganizationDomainSchema } from '@/schema/authorize-organization-domain-schema'

export async function authorizeOrganizationDomainAction(data: FormData) {
	const currentOrganization = await getCurrentOrganization()
	const result = authorizeOrganizationDomainSchema.safeParse(
		Object.fromEntries(data),
	)

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors
		return { success: false, message: null, errors }
	}

	const { domain, shouldAttachUsersByDomain } = result.data

	if (!domain) {
		return { success: false, message: null, errors: null }
	}

	try {
		await authorizeOrganizationDomain({
			organizationSlug: currentOrganization!,
			domain,
			shouldAttachUsersByDomain,
		})

		revalidateTag(`organizations/${currentOrganization}`)
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
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
		message: success.ORGANIZATION_DOMAIN_CREATED,
		errors: null,
	}
}

export async function removeOrganizationDomainAction() {
	const currentOrganization = await getCurrentOrganization()

	try {
		await removeOrganizationDomain({
			organizationSlug: currentOrganization!,
		})

		revalidateTag(`organizations/${currentOrganization}`)
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
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
		message: success.ORGANIZATION_DOMAIN_REMOVED,
		errors: null,
	}
}
