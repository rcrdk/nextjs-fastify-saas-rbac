import { rolesSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getMembers(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/organization/:slug/members',
			{
				schema: {
					tags: ['Organization members'],
					summary: 'Show organization members list.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						200: z.object({
							members: z.array(
								z.object({
									memberId: z.string().uuid(),
									userId: z.string().uuid(),
									role: rolesSchema,
									name: z.string().nullable(),
									email: z.string().email(),
									avatarUrl: z.string().nullable(),
								}),
							),
						}),
					},
				},
			},
			async (request, reply) => {
				const { slug } = request.params
				const userId = await request.getCurrentUserId()

				const { organization, membership } =
					await request.getCurrentUserMembership(slug)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('get', 'User')) {
					throw new UnauthorizedError(errors.organizations.members.CANNOT_LIST)
				}

				const members = await prisma.member.findMany({
					where: {
						organizationId: organization.id,
					},
					orderBy: {
						role: 'asc',
					},
					select: {
						id: true,
						role: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								avatarUrl: true,
							},
						},
					},
				})

				const membersFlatten = members.map((member) => {
					return {
						memberId: member.id,
						userId: member.user.id,
						role: member.role,
						name: member.user.name,
						email: member.user.email,
						avatarUrl: member.user.avatarUrl,
					}
				})

				return reply.status(200).send({
					members: membersFlatten,
				})
			},
		)
}
