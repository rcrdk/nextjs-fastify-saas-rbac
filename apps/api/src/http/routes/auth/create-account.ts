/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function createAccount(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/users',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Create a new account',
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
				return reply.status(400).send({
					message: 'User with same e-mail already exists.',
				})
			}

			const autoJoinOrganization = await prisma.organization.findFirst({
				where: {
					domain: email.split('@').at(1),
					shouldAttachUsersByDomain: true,
				},
			})

			const hashedPassword = await hash(password, 8)

			await prisma.user.create({
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

			reply.status(201).send()
		},
	)
}
