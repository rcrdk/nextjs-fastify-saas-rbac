import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithPassword(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/sessions/password',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Authenticate with e-mail and password.',
				body: z.object({
					email: z.string().email(),
					password: z.string(),
				}),
				response: {
					201: z.object({
						token: z.string(),
						emailValidatedAt: z.date().nullable(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, password } = request.body

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
				emailValidatedAt: userFromEmail.emailValidatedAt,
			})
		},
	)
}
