import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function confirmEmailChangeToken(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.patch(
			'/users/email',
			{
				schema: {
					tags: ['Account'],
					summary: 'Confirm user e-mail change.',
					security: [{ bearerAuth: [] }],
					body: z.object({
						code: z.string().uuid(),
					}),
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				const token = await prisma.token.findFirst({
					where: {
						userId,
						type: 'EMAIL_CHANGE_VALIDATION',
					},
				})

				if (!token) {
					throw new BadRequestError(errors.user.EMAIL_VALIDATION_EXPIRED)
				}

				const { code } = request.body

				if (code !== token.id) {
					throw new BadRequestError(errors.user.EMAIL_VALIDATION_INVALID)
				}

				const tokenWasCreatedAt = dayjs(token.createdAt)
				const wasTokenCreatedWithin5Minutes =
					dayjs().diff(tokenWasCreatedAt, 'minutes') <= 5

				if (!wasTokenCreatedWithin5Minutes) {
					await prisma.token.delete({
						where: {
							id: token.id,
						},
					})

					throw new BadRequestError(errors.user.EMAIL_VALIDATION_EXPIRED)
				}

				await prisma.$transaction([
					prisma.user.update({
						where: {
							id: userId,
						},
						data: {
							email: token.payload!,
						},
					}),
					prisma.token.delete({
						where: {
							id: token.id,
						},
					}),
				])

				return reply.status(204).send()
			},
		)
}
