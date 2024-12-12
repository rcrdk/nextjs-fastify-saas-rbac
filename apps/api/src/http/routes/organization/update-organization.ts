import { organizationSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'
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
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug } = request.params
				const { name } = request.body

				const userId = await request.getCurrentUserId()
				const { membership, organization } =
					await request.getCurrentUserMembership(slug)

				const authOrganization = organizationSchema.parse({
					id: organization.id,
					ownerId: organization.ownerId,
				})

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('update', authOrganization)) {
					throw new UnauthorizedError(errors.organizations.entity.CANNOT_UPDATE)
				}

				const newSlug = generateSlug(name)

				const organizationNameAlreadyExists =
					await prisma.organization.findFirst({
						where: {
							slug: newSlug,
							id: {
								not: organization.id,
							},
						},
					})

				if (organizationNameAlreadyExists) {
					throw new BadRequestError(errors.organizations.entity.ALREADY_EXISTS)
				}

				await prisma.organization.update({
					where: {
						id: organization.id,
					},
					data: {
						name,
						slug: generateSlug(name),
					},
				})

				return reply.status(204).send()
			},
		)
}
