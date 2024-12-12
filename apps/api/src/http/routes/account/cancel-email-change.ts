import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function deleteEmailChangeToken(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/users/email',
			{
				schema: {
					tags: ['Account'],
					summary: 'Delete an open validation change to user e-mail.',
					security: [{ bearerAuth: [] }],
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				const token = await prisma.token.deleteMany({
					where: {
						userId,
						type: 'EMAIL_CHANGE_VALIDATION',
					},
				})

				if (!token) {
					throw new BadRequestError(errors.user.EMAIL_VALIDATION_EXPIRED)
				}

				return reply.status(204).send({
					token,
				})
			},
		)
}
