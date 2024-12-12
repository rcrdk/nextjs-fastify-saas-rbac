import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { changeAccountEmail } from '@/http/emails/change-account-email'
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
				const { email: newEmail, name } = request.body

				const userWithSameEmail = await prisma.user.findFirst({
					where: {
						email: newEmail,
						id: {
							not: userId,
						},
					},
				})

				if (userWithSameEmail) {
					throw new BadRequestError(errors.user.ALREADY_EXISTS)
				}

				const currentUser = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				})

				if (!currentUser) {
					throw new BadRequestError(errors.user.NOT_FOUND)
				}

				const hasAnEmailChangePending = await prisma.token.findFirst({
					where: {
						userId,
						type: 'EMAIL_CHANGE_VALIDATION',
					},
				})

				const { email: currentEmail } = currentUser

				if (currentEmail !== newEmail && !hasAnEmailChangePending) {
					const { id: verificationCode } = await prisma.token.create({
						data: {
							userId,
							type: 'EMAIL_CHANGE_VALIDATION',
							payload: newEmail,
						},
					})

					try {
						await changeAccountEmail({
							name,
							oldEmail: currentEmail,
							newEmail,
							code: verificationCode,
						})
					} catch {
						throw new BadRequestError(errors.services.SEND_EMAIL)
					}
				}

				await prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						name,
					},
				})

				reply.status(204).send()
			},
		)
}
