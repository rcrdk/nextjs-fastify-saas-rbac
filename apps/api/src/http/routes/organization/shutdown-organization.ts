import { organizationSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { deleteMultipleObjectsR2 } from '@/lib/cloudflare-r2'
import { prisma } from '@/lib/prisma'
import { getUploadedAvatarNames } from '@/utils/get-uploaded-avatar-names'
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
						errors.organizations.entity.CANNOT_SHUTDOWN,
					)
				}

				const organizationFromDatabse = await prisma.organization.findUnique({
					where: {
						id: organization.id,
					},
					include: {
						projects: true,
					},
				})

				// filter uploaded avatars
				const avatars: string[] = []

				if (organizationFromDatabse?.avatarUrl) {
					avatars.push(organizationFromDatabse.avatarUrl)
				}

				if (organizationFromDatabse?.projects.length) {
					organizationFromDatabse.projects
						.filter((project) => !!project.avatarUrl)
						.map((project) => avatars.push(project.avatarUrl!))
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

				// delete organization
				await prisma.organization.delete({
					where: {
						id: organization.id,
					},
				})

				return reply.status(204).send()
			},
		)
}
