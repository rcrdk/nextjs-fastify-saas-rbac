import { projectSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

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

				if (cannot('delete', authProject)) {
					throw new UnauthorizedError(
						'You are not allowed to delete this project',
					)
				}

				// filter uploaded avatars
				const avatars: string[] = []

				if (project?.avatarUrl) {
					avatars.push(project.avatarUrl)
				}

				const uploadedAvatars = getUploadedAvatarNames(avatars)

				// delete user related avatars
				await prisma.avatar.deleteMany({
					where: {
						name: {
							in: uploadedAvatars,
						},
					},
				})

				// delete user related avatars files
				await deleteMultipleObjectsR2(uploadedAvatars)

				// delete project
				await prisma.project.delete({
					where: {
						id: projectId,
					},
				})

				// delete avatar

				return reply.status(204).send()
			},
		)
}
