import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function updateAccount(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.put(
			'/users',
			{
				schema: {
					tags: ['Account'],
					summary: 'Update account informations.',
					security: [{ bearerAuth: [] }],
					body: z.object({
						name: z.string(),
						email: z.string().email(),
					}),
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()
				const { email, name } = request.body

				const userWithSameEmail = await prisma.user.findFirst({
					where: {
						email,
						id: {
							not: userId,
						},
					},
				})

				if (userWithSameEmail) {
					throw new BadRequestError('User with same e-mail already exists')
				}

				await prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						name,
						email,
					},
				})

				reply.status(204).send()
			},
		)
}
