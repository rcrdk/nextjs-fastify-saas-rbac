import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function authenticateWithPassword(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/sessions/password',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Authenticate with e-mail and password',
				body: z.object({
					email: z.string().email(),
					password: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { email, password } = request.body

			const userFromEmail = await prisma.user.findUnique({
				where: { email },
			})

			if (!userFromEmail) {
				return reply.status(400).send({
					message: 'Invalid credentials.',
				})
			}

			if (userFromEmail.passwordHash === null) {
				return reply.status(400).send({
					message: 'User does not have a password, use social sign-in.',
				})
			}

			const isPasswordValid = await compare(
				password,
				userFromEmail.passwordHash,
			)

			if (!isPasswordValid) {
				return reply.status(400).send({
					message: 'Invalid credentials.',
				})
			}

			const token = await reply.jwtSign(
				{
					sub: userFromEmail.id,
				},
				{
					expiresIn: '7d',
				},
			)

			return reply.status(201).send({ token })
		},
	)
}
