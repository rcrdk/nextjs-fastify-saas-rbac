import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/password/recover',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Request password recover.',
				body: z.object({
					email: z.string().email(),
				}),
				response: {
					201: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { email } = request.body

			const userWithEmail = await prisma.user.findUnique({
				where: { email },
			})

			if (!userWithEmail) {
				return reply.status(201).send()
			}

			const { id: code } = await prisma.token.create({
				data: {
					type: 'PASSWORD_RECOVER',
					userId: userWithEmail.id,
				},
			})

			// send e-mail with recover link
			console.log(`Recover password token: ${code}`)

			return reply.status(201).send()
		},
	)
}
