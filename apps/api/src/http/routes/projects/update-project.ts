import { projectSchema } from '@saas/auth'
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

export async function updateProject(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.put(
			'/organization/:slug/projects/:projectId',
			{
				schema: {
					tags: ['Projects'],
					summary: 'Update a project.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
						projectId: z.string().uuid(),
					}),
					body: z.object({
						name: z.string(),
						description: z.string(),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug, projectId } = request.params
				const userId = await request.getCurrentUserId()

				const { organization, membership } =
					await request.getCurrentUserMembership(slug)

				const project = await prisma.project.findUnique({
					where: {
						id: projectId,
						organizationId: organization.id,
					},
				})

				if (!project) {
					throw new BadRequestError(errors.projects.NOT_FOUND)
				}

				const authProject = projectSchema.parse(project)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('update', authProject)) {
					throw new UnauthorizedError(errors.projects.CANNOT_UPDATE)
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

				if (
					existsAnotherProjectWithSameSlug &&
					existsAnotherProjectWithSameSlug.id !== project.id
				) {
					throw new BadRequestError(errors.projects.ALREADY_EXISTS)
				}

				await prisma.project.update({
					where: {
						id: projectId,
					},
					data: {
						name,
						description,
						slug: newSlug,
					},
				})

				return reply.status(204).send()
			},
		)
}
