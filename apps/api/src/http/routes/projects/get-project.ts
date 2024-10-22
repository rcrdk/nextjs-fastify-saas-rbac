import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getProject(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/organization/:organizationSlug/projects/:projectSlug',
			{
				schema: {
					tags: ['Projects'],
					summary: 'Show project details.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						organizationSlug: z.string(),
						projectSlug: z.string(),
					}),
					response: {
						200: z.object({
							project: z.object({
								id: z.string().uuid(),
								name: z.string(),
								slug: z.string(),
								description: z.string(),
								avatarUrl: z.string().url().nullable(),
								organizationId: z.string().uuid(),
								createdAt: z.date(),
								updatedAt: z.date(),
								owner: z.object({
									id: z.string().uuid(),
									name: z.string().nullable(),
									avatarUrl: z.string().url().nullable(),
									email: z.string().email(),
								}),
							}),
						}),
					},
				},
			},
			async (request, reply) => {
				const { organizationSlug, projectSlug } = request.params
				const userId = await request.getCurrentUserId()

				const { organization, membership } =
					await request.getCurrentUserMembership(organizationSlug)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('get', 'Project')) {
					throw new UnauthorizedError('You are not allowed to get a project')
				}

				const project = await prisma.project.findUnique({
					where: {
						organizationId_slug: {
							slug: projectSlug,
							organizationId: organization.id,
						},
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

				if (!project) {
					throw new BadRequestError('Project not found')
				}

				return reply.status(200).send({
					project,
				})
			},
		)
}
