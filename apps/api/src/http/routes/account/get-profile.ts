import dayjs from 'dayjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { accountProvidersSchema } from '@/schemas/account-providers-schema'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/profile',
			{
				schema: {
					tags: ['Account'],
					summary: 'Get authenticated user profile.',
					security: [{ bearerAuth: [] }],
					response: {
						200: z.object({
							user: z.object({
								id: z.string().uuid(),
								name: z.string().nullable(),
								email: z.string().email(),
								avatarUrl: z.string().nullable(),
								passwordHash: z.boolean(),
								accounts: z.array(
									z.object({
										id: z.string().uuid(),
										provider: accountProvidersSchema,
										createdAt: z.date(),
									}),
								),
							}),
						}),
					},
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				const user = await prisma.user.findUnique({
					where: { id: userId },
					select: {
						id: true,
						name: true,
						email: true,
						avatarUrl: true,
						passwordHash: true,
						accounts: {
							select: {
								id: true,
								provider: true,
								createdAt: true,
							},
						},
					},
				})

				if (!user) {
					throw new BadRequestError(errors.user.NOT_FOUND)
				}

				const hasAnEmailChangePending = await prisma.token.findFirst({
					where: {
						userId: user.id,
						type: 'EMAIL_CHANGE_VALIDATION',
					},
				})

				if (hasAnEmailChangePending) {
					const tokenWasCreatedAt = dayjs(hasAnEmailChangePending.createdAt)
					const wasTokenCreatedWithin5Minutes =
						dayjs().diff(tokenWasCreatedAt, 'minutes') <= 5

					if (!wasTokenCreatedWithin5Minutes) {
						await prisma.token.delete({
							where: {
								id: hasAnEmailChangePending.id,
							},
						})
					}
				}

				return reply.status(200).send({
					user: {
						...user,
						passwordHash: !!user.passwordHash,
					},
				})
			},
		)
}
