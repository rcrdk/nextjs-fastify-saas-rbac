import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function deleteAccount(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/users',
			{
				schema: {
					tags: ['Account'],
					summary: 'Delete account.',
					security: [{ bearerAuth: [] }],
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				await prisma.user.delete({
					where: {
						id: userId,
					},
				})

				reply.status(200).send()
			},
		)
}
