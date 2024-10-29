import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { tokensSchema } from '@/schemas/tokens'

export async function checkEmailChange(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/users/email',
			{
				schema: {
					tags: ['Account'],
					summary:
						'Check if there is an open validation change to user e-mail.',
					security: [{ bearerAuth: [] }],
					response: {
						200: z.object({
							token: z
								.object({
									userId: z.string().uuid(),
									type: tokensSchema,
									payload: z.string().email().nullable(),
									createdAt: z.date(),
								})
								.nullable(),
						}),
					},
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				const token = await prisma.token.findFirst({
					where: {
						userId,
						type: 'EMAIL_CHANGE_VALIDATION',
					},
					select: {
						type: true,
						createdAt: true,
						payload: true,
						userId: true,
					},
				})

				return reply.status(200).send({
					token,
				})
			},
		)
}
