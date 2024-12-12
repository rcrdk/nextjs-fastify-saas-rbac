import { organizationSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { transferOrganizationOwnershipEmail } from '@/http/emails/transfer-organization-ownership-email'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function transferOrganization(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.patch(
			'/organizations/:slug/owner',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Transfer organization ownership.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					body: z.object({
						transferToUserId: z.string().uuid(),
						action: z.enum(['UPDATE_ROLE', 'LEAVE']),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug } = request.params
				const { transferToUserId, action } = request.body

				const userId = await request.getCurrentUserId()
				// eslint-disable-next-line prettier/prettier
				const { membership, organization } = await request.getCurrentUserMembership(slug)				

				const authOrganization = organizationSchema.parse({
					id: organization.id,
					ownerId: organization.ownerId,
				})

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('transfer_ownership', authOrganization)) {
					throw new UnauthorizedError(
						errors.organizations.entity.CANNOT_TRANSFER,
					)
				}

				const transferToMembership = await prisma.member.findUnique({
					where: {
						organizationId_userId: {
							organizationId: organization.id,
							userId: transferToUserId,
						},
					},
				})

				if (!transferToMembership) {
					throw new BadRequestError(errors.organizations.entity.NOT_MEMBER)
				}

				await prisma.$transaction([
					prisma.member.update({
						where: {
							organizationId_userId: {
								organizationId: organization.id,
								userId: transferToUserId,
							},
						},
						data: {
							role: 'ADMIN',
						},
					}),
					prisma.organization.update({
						where: {
							id: organization.id,
						},
						data: {
							ownerId: transferToUserId,
						},
					}),

					action === 'UPDATE_ROLE'
						? prisma.member.update({
								where: {
									organizationId_userId: {
										organizationId: organization.id,
										userId,
									},
								},
								data: {
									role: 'MEMBER',
								},
							})
						: prisma.member.delete({
								where: {
									organizationId_userId: {
										organizationId: organization.id,
										userId,
									},
								},
							}),
				])

				const newOwner = await prisma.user.findUniqueOrThrow({
					where: {
						id: transferToUserId,
					},
				})

				try {
					await transferOrganizationOwnershipEmail({
						organizationName: organization.name,
						targetName: newOwner.name ?? '',
						targetEmail: newOwner.email,
					})
				} catch {
					throw new BadRequestError(errors.services.SEND_EMAIL)
				}

				return reply.status(204).send()
			},
		)
}
