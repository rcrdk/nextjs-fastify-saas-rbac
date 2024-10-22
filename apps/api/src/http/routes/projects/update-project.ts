import { projectSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

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
					throw new BadRequestError('Project not found')
				}

				const authProject = projectSchema.parse(project)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('update', authProject)) {
					throw new UnauthorizedError(
						'You are not allowed to uptate this project',
					)
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
					throw new BadRequestError(
						'There is another project in this organization using the same project name. Please, choose another one',
					)
				}

				await prisma.project.update({
					where: {
						id: projectId,
					},
					data: {
						name,
						description,
					},
				})

				return reply.status(204).send()
			},
		)
}
