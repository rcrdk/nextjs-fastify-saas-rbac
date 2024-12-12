import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/http/middlewares/auth'
import { deleteMultipleObjectsR2 } from '@/lib/cloudflare-r2'
import { prisma } from '@/lib/prisma'
import { getUploadedAvatarNames } from '@/utils/get-uploaded-avatar-names'

export async function deleteAccount(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/users',
			{
				schema: {
					tags: ['Account'],
					summary: 'Delete account.',
					security: [{ bearerAuth: [] }],
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				const user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
					include: {
						ownsOrganizations: {
							include: {
								projects: true,
							},
						},
					},
				})

				// filter uploaded avatars
				const avatars: string[] = []

				if (user?.avatarUrl) {
					avatars.push(user.avatarUrl)
				}

				if (user?.ownsOrganizations.length) {
					user.ownsOrganizations
						.filter((organization) => !!organization.avatarUrl)
						.map((organization) => {
							avatars.push(organization.avatarUrl!)

							organization.projects
								.filter((project) => !!project.avatarUrl)
								.map((project) => avatars.push(project.avatarUrl!))

							return true
						})
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

				// delete user
				await prisma.user.delete({
					where: {
						id: userId,
					},
				})

				reply.status(200).send()
			},
		)
}
