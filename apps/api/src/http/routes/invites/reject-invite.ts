import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function rejectInvite(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			'/invites/:inviteId/reject',
			{
				schema: {
					tags: ['Invites'],
					summary: 'Reject an invite.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						inviteId: z.string().uuid(),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()
				const { inviteId } = request.params

				const invite = await prisma.invite.findUnique({
					where: { id: inviteId },
				})

				if (!invite) {
					throw new BadRequestError(errors.organizations.invites.NOT_FOUND)
				}

				const user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				})

				if (!user) {
					throw new BadRequestError(errors.user.NOT_FOUND)
				}

				if (invite.email !== user.email) {
					throw new BadRequestError(errors.organizations.invites.NOT_ALLOWED)
				}

				await prisma.invite.delete({
					where: {
						id: invite.id,
					},
				})

				return reply.status(204).send()
			},
		)
}
