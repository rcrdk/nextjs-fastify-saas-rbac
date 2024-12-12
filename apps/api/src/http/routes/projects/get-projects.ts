import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getProjects(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/organization/:slug/projects',
			{
				schema: {
					tags: ['Projects'],
					summary: 'Show projects list.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						200: z.object({
							projects: z.array(
								z.object({
									id: z.string().uuid(),
									name: z.string(),
									slug: z.string(),
									description: z.string(),
									avatarUrl: z.string().nullable(),
									organizationId: z.string().uuid(),
									createdAt: z.date(),
									updatedAt: z.date(),
									owner: z
										.object({
											id: z.string().uuid(),
											name: z.string().nullable(),
											avatarUrl: z.string().nullable(),
											email: z.string().email(),
										})
										.nullable(),
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

				if (cannot('get', 'Project')) {
					throw new UnauthorizedError(errors.projects.CANNOT_LIST)
				}

				const projects = await prisma.project.findMany({
					where: {
						organizationId: organization.id,
					},
					orderBy: {
						createdAt: 'desc',
					},
					select: {
						id: true,
						name: true,
						slug: true,
						description: true,
						avatarUrl: true,
						organizationId: true,
						createdAt: true,
						updatedAt: true,
						owner: {
							select: {
								id: true,
								name: true,
								avatarUrl: true,
								email: true,
							},
						},
					},
				})

				return reply.status(200).send({
					projects,
				})
			},
		)
}
