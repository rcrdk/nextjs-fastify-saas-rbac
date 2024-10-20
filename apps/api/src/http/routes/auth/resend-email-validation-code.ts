import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAccountEmail } from '@/http/emails/verify-account-email'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function resendEmailValidationCode(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/users/resend-email-validation-code',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Resend a validation code by e-mail.',
				body: z.object({
					email: z.string().email(),
				}),
				response: {
					200: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { email } = request.body

			const userFromEmail = await prisma.user.findFirst({
				where: {
					email,
					emailValidatedAt: {
						equals: null,
					},
				},
			})

			if (!userFromEmail) {
				throw new BadRequestError('Invalid credentials.')
			}

			const { id: validationCode } = await prisma.token.create({
				data: {
					type: 'EMAIL_VALIDATION',
					userId: userFromEmail.id,
				},
			})

			try {
				await verifyAccountEmail({
					name: userFromEmail.name,
					email,
					code: validationCode,
				})
			} catch {
				throw new BadRequestError(
					'An error occurred while trying to send e-mail with e-mail validation.',
				)
			}

			return reply.status(200).send()
		},
	)
}
