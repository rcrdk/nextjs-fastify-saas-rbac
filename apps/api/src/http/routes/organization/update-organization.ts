import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function updateOrganization(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.put(
			'/organizations/:slug',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Update organization details.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					body: z.object({
						name: z.string(),
						domain: z.string().nullish(),
						shouldAttachUsersByDomain: z.boolean().optional(),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug } = request.params
				const { name, domain, shouldAttachUsersByDomain } = request.body

				const userId = await request.getCurrentUserId()
				// eslint-disable-next-line prettier/prettier
				const { membership, organization } = await request.getCurrentUserMembership(slug)				

				const authOrganization = organizationSchema.parse({
					id: organization.id,
					ownerId: organization.ownerId,
				})

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('update', authOrganization)) {
					throw new UnauthorizedError(
						'You are not allowed to update this organization.',
					)
				}

				if (domain) {
					const organizationByDomain = await prisma.organization.findFirst({
						where: {
							domain,
							id: {
								not: organization.id,
							},
						},
					})

					if (organizationByDomain) {
						throw new BadRequestError(
							'Another organization with same domain already exists.',
						)
					}
				}

				await prisma.organization.update({
					where: {
						id: organization.id,
					},
					data: {
						name,
						domain,
						shouldAttachUsersByDomain,
					},
				})

				return reply.status(204).send()
			},
		)
}
