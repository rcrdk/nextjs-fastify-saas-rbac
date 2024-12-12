import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getOrganization(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/organizations/:slug',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Get details of an organization where user is a member.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						200: z.object({
							organization: z.object({
								id: z.string().uuid(),
								slug: z.string(),
								name: z.string(),
								domain: z.string().nullable(),
								domainValidationId: z.string().uuid().nullable(),
								domainValidatedAt: z.date().nullable(),
								shouldAttachUsersByDomain: z.boolean(),
								avatarUrl: z.string().nullable(),
								createdAt: z.date(),
								updatedAt: z.date(),
								ownerId: z.string().uuid(),
							}),
						}),
					},
				},
			},
			async (request) => {
				const { slug } = request.params
				const { organization } = await request.getCurrentUserMembership(slug)

				return {
					organization,
				}
			},
		)
}
