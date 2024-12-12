import { randomUUID } from 'node:crypto'

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { prisma } from '@/lib/prisma'

import { auth } from '../../middlewares/auth'
import { BadRequestError } from '../_errors/bad-request-error'

export async function removeDomain(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			'/organization/:slug/domain',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Delete a domain from a organization.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug: organizationSlug } = request.params

				const organization = await prisma.organization.findUnique({
					where: {
						slug: organizationSlug,
					},
				})

				if (!organization) {
					throw new BadRequestError(errors.organizations.entity.NOT_FOUND)
				}

				await prisma.organization.update({
					where: {
						id: organization.id,
					},
					data: {
						domain: null,
						domainValidatedAt: null,
						domainValidationId: randomUUID(),
					},
				})

				reply.status(204).send()
			},
		)
}
