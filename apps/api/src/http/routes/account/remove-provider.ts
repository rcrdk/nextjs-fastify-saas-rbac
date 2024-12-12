import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { accountProvidersSchema } from '@/schemas/account-providers-schema'

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
					security: [{ bearerAuth: [] }],
					params: z.object({
						provider: accountProvidersSchema,
					}),
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()
				const { provider } = request.params

				const userWithoutPassword = await prisma.user.findFirst({
					where: {
						id: userId,
						passwordHash: null,
					},
				})

				const countAccountsAvailable = await prisma.account.count({
					where: { userId },
				})

				if (userWithoutPassword && countAccountsAvailable < 2) {
					throw new BadRequestError(errors.auth.LAST_METHOD_AVAILABLE)
				}

				const accountExists = await prisma.account.findFirst({
					where: {
						userId,
						provider,
					},
				})

				if (!accountExists) {
					throw new BadRequestError(errors.user.ACCOUNT_NOT_FOUND)
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
