import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function shutdownOrganization(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/organizations/:slug',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Shutdown organization.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug } = request.params

				const userId = await request.getCurrentUserId()
				// eslint-disable-next-line prettier/prettier
				const { membership, organization } = await request.getCurrentUserMembership(slug)				

				const authOrganization = organizationSchema.parse({
					id: organization.id,
					ownerId: organization.ownerId,
				})

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('delete', authOrganization)) {
					throw new UnauthorizedError(
						'You are not allowed to shutdown this organization',
					)
				}

				await prisma.organization.delete({
					where: {
						id: organization.id,
					},
				})

				return reply.status(204).send()
			},
		)
}
