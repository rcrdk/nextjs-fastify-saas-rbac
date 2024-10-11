import { rolesSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createInvite(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			'/organization/:slug/invites',
			{
				schema: {
					tags: ['Invites'],
					summary: 'Create a new invite.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					body: z.object({
						email: z.string().email(),
						role: rolesSchema,
					}),
					response: {
						201: z.object({
							inviteId: z.string().uuid(),
						}),
					},
				},
			},
			async (request, reply) => {
				const { slug } = request.params
				const userId = await request.getCurrentUserId()

				const { organization, membership } =
					await request.getCurrentUserMembership(slug)

				const { cannot } = getUserPermissions(userId, membership.role)

				if (cannot('create', 'Invite')) {
					throw new UnauthorizedError(
						'You are not allowed to create a new invite.',
					)
				}

				const { email, role } = request.body

				const domain = email.split('@').at(1)

				if (
					organization.shouldAttachUsersByDomain &&
					organization.domain === domain
				) {
					throw new BadRequestError(
						`Users with ${domain} domain will join your organization automatically on sign in.`,
					)
				}

				const inviteWithSameEmail = await prisma.invite.findUnique({
					where: {
						email_organizationId: {
							email,
							organizationId: organization.id,
						},
					},
				})

				if (inviteWithSameEmail) {
					throw new BadRequestError(
						`Another invite with same e-mail already exists.`,
					)
				}

				const memberWithSameEmail = await prisma.member.findFirst({
					where: {
						organizationId: organization.id,
						user: {
							email,
						},
					},
				})

				if (memberWithSameEmail) {
					throw new BadRequestError(
						`A member with this e-mail already belongs to your organization.`,
					)
				}

				const invite = await prisma.invite.create({
					data: {
						organizationId: organization.id,
						authorId: userId,
						email,
						role,
					},
				})

				return reply.status(201).send({
					inviteId: invite.id,
				})
			},
		)
}
