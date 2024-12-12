import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'

import { BadRequestError } from '../_errors/bad-request-error'

export async function creteOrganization(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			'/organizations',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Create a new organization.',
					security: [{ bearerAuth: [] }],
					body: z.object({
						name: z.string(),
					}),
					response: {
						201: z.object({
							organizationId: z.string().uuid(),
						}),
					},
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId()

				const { name } = request.body

				const newSlug = generateSlug(name)

				const organizationNameAlreadyExists =
					await prisma.organization.findFirst({
						where: {
							slug: newSlug,
						},
					})

				if (organizationNameAlreadyExists) {
					throw new BadRequestError(errors.organizations.entity.ALREADY_EXISTS)
				}

				const organization = await prisma.organization.create({
					data: {
						name,
						slug: newSlug,
						ownerId: userId,
						members: {
							create: {
								userId,
								role: 'ADMIN',
							},
						},
					},
				})

				return reply.status(201).send({
					organizationId: organization.id,
				})
			},
		)
}
