import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function leaveOrganization(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/users/organizations/:organization',
			{
				schema: {
					tags: ['Account'],
					summary: 'Leave a organization.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						organization: z.string(),
					}),
					response: {
						200: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { organization: organizationSlug } = request.params
				const userId = await request.getCurrentUserId()

				const { organization, membership } =
					await request.getCurrentUserMembership(organizationSlug)

				if (userId === organization.ownerId) {
					throw new BadRequestError(
						'You are the owner of this organization, to leave it you must transfer the ownership first',
					)
				}

				await prisma.member.delete({
					where: {
						id: membership.id,
					},
				})

				return reply.status(200).send()
			},
		)
}
