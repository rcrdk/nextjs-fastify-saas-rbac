import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

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
						domain: z.string().nullish(),
						shouldAttachUsersByDomain: z.boolean().optional(),
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

				const { name, domain, shouldAttachUsersByDomain } = request.body

				if (domain) {
					const organizationByDomain = await prisma.organization.findUnique({
						where: { domain },
					})

					if (organizationByDomain) {
						throw new BadRequestError(
							'Another organization with same domain already exists.',
						)
					}
				}

				const organization = await prisma.organization.create({
					data: {
						name,
						slug: generateSlug(name),
						domain,
						shouldAttachUsersByDomain,
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
