import { compare } from 'bcryptjs'
import dayjs from 'dayjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function verifyEmailAndAuthenticate(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/users/verify-email',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Verify an e-mail by validation code and then sign in.',
				body: z.object({
					email: z.string().email(),
					password: z.string(),
					code: z.string().uuid(),
				}),
				response: {
					201: z.object({
						token: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, password, code } = request.body

			const userFromEmail = await prisma.user.findUnique({
				where: { email },
			})

			if (!userFromEmail) {
				throw new BadRequestError(errors.auth.INVALID_CREDENTIALS)
			}

			if (userFromEmail.passwordHash === null) {
				throw new BadRequestError(errors.auth.NOT_PASSWORD_FOUND)
			}

			const isPasswordValid = await compare(
				password,
				userFromEmail.passwordHash,
			)

			if (!isPasswordValid) {
				throw new BadRequestError(errors.auth.INVALID_CREDENTIALS)
			}

			const validationToken = await prisma.token.findFirst({
				where: {
					id: code,
					userId: userFromEmail.id,
					type: 'EMAIL_VALIDATION',
				},
			})

			if (!validationToken) {
				throw new BadRequestError(errors.auth.INVALID_EMAIL_TOKEN)
			}

			const tokenWasCreatedAt = dayjs(validationToken.createdAt)
			const wasTokenCreatedWithin5Minutes =
				dayjs().diff(tokenWasCreatedAt, 'minutes') <= 5

			if (!wasTokenCreatedWithin5Minutes) {
				await prisma.token.delete({
					where: {
						id: validationToken.id,
					},
				})

				throw new BadRequestError(errors.auth.INVALID_EMAIL_TOKEN)
			}

			await prisma.$transaction([
				prisma.user.update({
					where: {
						id: userFromEmail.id,
					},
					data: {
						emailValidatedAt: new Date(),
					},
				}),
				prisma.token.deleteMany({
					where: {
						userId: userFromEmail.id,
						type: 'EMAIL_VALIDATION',
					},
				}),
			])

			const token = await reply.jwtSign(
				{
					sub: userFromEmail.id,
				},
				{
					expiresIn: '7d',
				},
			)

			return reply.status(201).send({
				token,
			})
		},
	)
}
