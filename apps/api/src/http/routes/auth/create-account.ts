import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { verifyAccountEmail } from '@/http/emails/verify-account-email'
import { prisma } from '@/lib/prisma'
import { validateStrongPasswordSchema } from '@/schemas/validate-strong-password-schema'

import { BadRequestError } from '../_errors/bad-request-error'

export async function createAccount(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/users',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Create a new account.',
				body: z
					.object({
						name: z.string(),
						email: z.string().email(),
						password: z.string(),
					})
					.superRefine(validateStrongPasswordSchema),
			},
		},
		async (request, reply) => {
			const { email, name, password } = request.body

			const userWithSameEmail = await prisma.user.findUnique({
				where: {
					email,
				},
			})

			if (userWithSameEmail) {
				throw new BadRequestError(errors.user.ALREADY_EXISTS)
			}

			const autoJoinOrganization = await prisma.organization.findFirst({
				where: {
					domain: email.split('@').at(1),
					shouldAttachUsersByDomain: true,
				},
			})

			const hashedPassword = await hash(password, 8)

			const { id: userId } = await prisma.user.create({
				data: {
					name,
					email,
					passwordHash: hashedPassword,
					memberOn: autoJoinOrganization
						? {
								create: {
									organizationId: autoJoinOrganization.id,
								},
							}
						: undefined,
				},
			})

			const { id: verificationCode } = await prisma.token.create({
				data: {
					userId,
					type: 'EMAIL_VALIDATION',
				},
			})

			try {
				await verifyAccountEmail({
					name,
					email,
					code: verificationCode,
				})
			} catch {
				throw new BadRequestError(errors.services.SEND_EMAIL)
			}

			reply.status(201).send()
		},
	)
}
