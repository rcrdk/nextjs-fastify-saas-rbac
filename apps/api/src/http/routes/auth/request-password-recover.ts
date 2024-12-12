import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { passwordRecoverEmail } from '@/http/emails/password-recover-email'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

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

			try {
				await passwordRecoverEmail({
					name: userWithEmail.name,
					email,
					code,
				})
			} catch {
				throw new BadRequestError(errors.services.SEND_EMAIL)
			}

			return reply.status(201).send()
		},
	)
}
