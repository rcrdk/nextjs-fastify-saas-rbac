import { z } from 'zod'

import { validation } from '@/messages/validation'

export const authorizeOrganizationDomainSchema = z
	.object({
		domain: z.string().refine(
			(value) => {
				if (value) {
					const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
					return domainRegex.test(value)
				}
			},
			{
				message: validation.DOMAIN,
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
			message: validation.AUTOJOIN_DOMAIN,
			path: ['domain'],
		},
	)

export type AuthorizeOrganizationDomainSchema = z.infer<
	typeof authorizeOrganizationDomainSchema
>
