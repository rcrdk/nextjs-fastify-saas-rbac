import { hash } from 'bcryptjs'
import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function resetPassword(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/password/reset',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Reset user password.',
				body: z.object({
					code: z.string().uuid(),
					email: z.string().email(),
					password: z.string().min(6),
				}),
				response: {
					204: z.null(),
				},
			},
		},
		async (request, reply) => {
			// eslint-disable-next-line prettier/prettier
			const errorMessage = 'Unable to reset password. Please ensure your recovery code is valid and try again. Note: The code is valid for 5 minutes.'

			const { code, password, email } = request.body

			const emailFromRequest = await prisma.user.findUnique({
				where: {
					email,
				},
			})

			if (!emailFromRequest) {
				throw new UnauthorizedError(errorMessage)
			}

			const tokenFromCode = await prisma.token.findFirst({
				where: {
					id: code,
					type: 'PASSWORD_RECOVER',
					userId: emailFromRequest.id,
				},
			})

			if (!tokenFromCode) {
				throw new UnauthorizedError(errorMessage)
			}

			const tokenWasCreatedAt = dayjs(tokenFromCode.createdAt)
			const wasTokenCreatedWithin5Minutes =
				dayjs().diff(tokenWasCreatedAt, 'minutes') <= 5

			if (!wasTokenCreatedWithin5Minutes) {
				await prisma.token.delete({
					where: {
						id: tokenFromCode.id,
					},
				})

				throw new UnauthorizedError(errorMessage)
			}

			const hashedPassword = await hash(password, 8)

			await prisma.$transaction([
				prisma.user.update({
					where: {
						id: tokenFromCode.userId,
					},
					data: {
						passwordHash: hashedPassword,
					},
				}),
				prisma.token.deleteMany({
					where: {
						userId: emailFromRequest.id,
						type: 'PASSWORD_RECOVER',
					},
				}),
			])

			return reply.status(204).send()
		},
	)
}
