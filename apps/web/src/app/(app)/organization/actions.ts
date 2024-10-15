'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

const organizationSchema = z
	.object({
		name: z.string().min(4, 'Enter at least 4 characters.'),
		domain: z
			.string()
			.nullish()
			.transform((value) => (value === '' ? null : value))
			.refine(
				(value) => {
					if (value) {
						const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
						return domainRegex.test(value)
					}

					return true
				},
				{
					message: 'Enter a valid domain.',
				},
			),
		shouldAttachUsersByDomain: z
			.union([z.literal('on'), z.literal('off'), z.boolean()])
			.transform((value) => value === true || value === 'on')
			.default(false),
	})
	.refine(
		(data) => {
			if (data.shouldAttachUsersByDomain === true && !data.domain) {
				return false
			}

			return true
		},
		{
			message: 'A domain is required when auto-join is enabled.',
			path: ['domain'],
		},
	)

export type OrganizationSchema = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
	const result = organizationSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { name, domain, shouldAttachUsersByDomain } = result.data

	try {
		await createOrganization({
			name,
			domain,
			shouldAttachUsersByDomain,
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
			message: 'Unexpected error, try again in a few minutes.',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Successfully saved the organization data.',
		errors: null,
	}
}

export async function updateOrganizationAction(data: FormData) {
	const currentOrganization = getCurrentOrganization()
	const result = organizationSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { name, domain, shouldAttachUsersByDomain } = result.data

	try {
		await updateOrganization({
			organization: currentOrganization!,
			name,
			domain,
			shouldAttachUsersByDomain,
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
			message: 'Unexpected error, try again in a few minutes.',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Successfully saved the organization data.',
		errors: null,
	}
}
