import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getOrganizationBilling(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/organizations/:slug/billing',
			{
				schema: {
					tags: ['Billing'],
					summary: 'Get billing information from organization.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						200: z.object({
							billing: z.object({
								seats: z.object({
									amount: z.coerce.number(),
									unit: z.coerce.number(),
									price: z.coerce.number(),
								}),
								projects: z.object({
									amount: z.coerce.number(),
									unit: z.coerce.number(),
									price: z.coerce.number(),
								}),
								total: z.coerce.number(),
							}),
						}),
					},
				},
			},
			async (request) => {
				const { slug } = request.params
				const userId = await request.getCurrentUserId()
				const { membership, organization } =
					await request.getCurrentUserMembership(slug)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('get', 'Billing')) {
					throw new UnauthorizedError(errors.organizations.billing.CANNOT_LIST)
				}

				const [amountOfMembers, amountOfProjects] = await Promise.all([
					prisma.member.count({
						where: {
							organizationId: organization.id,
							role: { not: 'BILLING' },
						},
					}),
					prisma.project.count({
						where: {
							organizationId: organization.id,
						},
					}),
				])

				const billing = {
					seats: {
						amount: amountOfMembers,
						unit: 10.25,
						price: Number((amountOfMembers * 10.25).toFixed(2)),
					},
					projects: {
						amount: amountOfProjects,
						unit: 20.33,
						price: Number((amountOfProjects * 20.33).toFixed(2)),
					},
					total:
						Number((amountOfMembers * 10.25).toFixed(2)) +
						Number((amountOfProjects * 20.33).toFixed(2)),
				}

				return { billing }
			},
		)
}
