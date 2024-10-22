'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth'
import { authorizeOrganizationDomain } from '@/http/authorize-organization-domain'
import { removeOrganizationDomain } from '@/http/remove-organization-domain'
import { shutdownOrganization } from '@/http/shutdown-organization'

const organizationDomainSchema = z
	.object({
		domain: z.string().refine(
			(value) => {
				if (value) {
					const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
					return domainRegex.test(value)
				}
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

export type OrganizationDomainSchema = z.infer<typeof organizationDomainSchema>

export async function authorizeOrganizationDomainAction(data: FormData) {
	const currentOrganization = await getCurrentOrganization()
	const result = organizationDomainSchema.safeParse(Object.fromEntries(data))

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
			message: 'Unexpected error, try again in a few minutes.',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Successfully removed organization domain.',
		errors: null,
	}
}

export async function shutdownOrganizationAction() {
	const currentOrganization = await getCurrentOrganization()
	const cookieStore = await cookies()

	await shutdownOrganization({ organizationSlug: currentOrganization! })

	cookieStore.set(
		'@SAAS:deletedOrganization',
		'Your organization was shutted down',
		{
			// eslint-disable-next-line prettier/prettier
			expires: new Date().getTime() + ((60 * 1000) / 4), // 15s
		},
	)

	revalidateTag('organizations')

	redirect('/')
}
