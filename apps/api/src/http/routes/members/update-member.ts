import { rolesSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function updateMember(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.put(
			'/organization/:slug/members/:memberId',
			{
				schema: {
					tags: ['Organization members'],
					summary: 'Update a member from a organization.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
						memberId: z.string().uuid(),
					}),
					body: z.object({
						role: rolesSchema,
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug, memberId } = request.params
				const userId = await request.getCurrentUserId()

				const { organization, membership } =
					await request.getCurrentUserMembership(slug)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('update', 'User')) {
					throw new UnauthorizedError(
						errors.organizations.members.CANNOT_UPDATE,
					)
				}

				const { role } = request.body

				await prisma.member.update({
					where: {
						id: memberId,
						organizationId: organization.id,
					},
					data: {
						role,
					},
				})

				return reply.status(204).send()
			},
		)
}
