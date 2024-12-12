import { rolesSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getMemebership(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/organizations/:slug/membership',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Get user memebership on organization.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						200: z.object({
							membership: z.object({
								id: z.string().uuid(),
								role: rolesSchema,
								organizationId: z.string().uuid(),
								userId: z.string().uuid(),
							}),
						}),
					},
				},
			},
			async (request) => {
				const { slug } = request.params
				const { membership } = await request.getCurrentUserMembership(slug)

				return {
					membership: {
						id: membership.id,
						role: rolesSchema.parse(membership.role),
						organizationId: membership.organizationId,
						userId: membership.userId,
					},
				}
			},
		)
}
