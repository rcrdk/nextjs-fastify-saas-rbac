import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createProject(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			'/organization/:slug/projects',
			{
				schema: {
					tags: ['Projects'],
					summary: 'Create a new project.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					body: z.object({
						name: z.string(),
						description: z.string(),
					}),
					response: {
						201: z.object({
							projectId: z.string().uuid(),
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

				if (cannot('create', 'Project')) {
					throw new UnauthorizedError(errors.projects.CANNOT_CREATE)
				}

				const { name, description } = request.body

				const newSlug = generateSlug(name)

				const existsAnotherProjectWithSameSlug =
					await prisma.project.findUnique({
						where: {
							organizationId_slug: {
								organizationId: organization.id,
								slug: newSlug,
							},
						},
					})

				if (existsAnotherProjectWithSameSlug) {
					throw new BadRequestError(errors.projects.ALREADY_EXISTS)
				}

				const project = await prisma.project.create({
					data: {
						name,
						slug: newSlug,
						description,
						organizationId: organization.id,
						ownerId: userId,
					},
				})

				return reply.status(201).send({
					projectId: project.id,
				})
			},
		)
}
