import { projectSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { deleteMultipleObjectsR2 } from '@/lib/cloudflare-r2'
import { prisma } from '@/lib/prisma'
import { getUploadedAvatarNames } from '@/utils/get-uploaded-avatar-names'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function deleteProject(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/organization/:slug/projects/:projectId',
			{
				schema: {
					tags: ['Projects'],
					summary: 'Delete a project.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
						projectId: z.string().uuid(),
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

				console.log(projectId, organization.id)

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

				if (cannot('delete', authProject)) {
					throw new UnauthorizedError(errors.projects.CANNOT_DELETE)
				}

				// filter uploaded avatars
				const avatars: string[] = []

				if (project?.avatarUrl) {
					avatars.push(project.avatarUrl)
				}

				const uploadedAvatars = getUploadedAvatarNames(avatars)

				// delete avatars
				await prisma.avatar.deleteMany({
					where: {
						name: {
							in: uploadedAvatars,
						},
					},
				})

				// delete avatars files
				await deleteMultipleObjectsR2(uploadedAvatars)

				// delete project
				await prisma.project.delete({
					where: {
						id: projectId,
					},
				})

				return reply.status(204).send()
			},
		)
}
