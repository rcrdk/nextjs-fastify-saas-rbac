/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAccountEmail } from '@/http/emails/verify-account-email'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function createAccount(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/users',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Create a new account.',
				body: z.object({
					name: z.string(),
					email: z.string().email(),
					password: z.string().min(6),
				}),
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
				throw new BadRequestError(
					'User with same e-mail already exists.',
				)
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
					memberOn: autoJoinOrganization ? {
						create: {
							organizationId: autoJoinOrganization.id,
						},
					} : undefined,
				},
			})

			const { id: verificationCode } = await prisma.token.create({
				data: {
					userId,
					type: 'EMAIL_VALIDATION',
				}
			})

			try {
				await verifyAccountEmail({
					name,
					email,
					code: verificationCode,
				})
			} catch {
				throw new BadRequestError(
					'An error occurred while trying to send e-mail with e-mail validation.',
				)
			}

			reply.status(201).send()
		},
	)
}
