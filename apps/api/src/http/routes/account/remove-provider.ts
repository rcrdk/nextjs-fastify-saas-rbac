import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { accountProvidersSchema } from '@/schemas/account-providers'

import { BadRequestError } from '../_errors/bad-request-error'

export async function removeAccountProvider(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/users/providers/:provider',
			{
				schema: {
					tags: ['Account'],
					summary: 'Delete a authentication provider from your account.',
					params: z.object({
						provider: accountProvidersSchema,
					}),
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()
				const { provider } = request.params

				const accountExists = await prisma.account.findFirst({
					where: {
						userId,
						provider,
					},
				})

				if (!accountExists) {
					throw new BadRequestError('Account does not exists')
				}

				await prisma.account.delete({
					where: {
						id: accountExists.id,
					},
				})

				reply.status(200).send()
			},
		)
}
