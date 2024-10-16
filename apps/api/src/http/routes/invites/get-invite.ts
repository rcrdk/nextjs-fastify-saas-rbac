import { rolesSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getInvite(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/invites/:inviteId',
		{
			schema: {
				tags: ['Invites'],
				summary: 'Get an invite details.',
				params: z.object({
					inviteId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						invite: z.object({
							id: z.string().uuid(),
							email: z.string().email(),
							role: rolesSchema,
							createdAt: z.date(),
							author: z
								.object({
									id: z.string().uuid(),
									name: z.string().nullable(),
									avatarUrl: z.string().url().nullable(),
								})
								.nullable(),
							organization: z.object({
								name: z.string(),
							}),
						}),
					}),
				},
			},
		},
		async (request, reply) => {
			const { inviteId } = request.params

			const invite = await prisma.invite.findUnique({
				where: { id: inviteId },
				select: {
					id: true,
					email: true,
					role: true,
					createdAt: true,
					author: {
						select: {
							id: true,
							name: true,
							avatarUrl: true,
						},
					},
					organization: {
						select: {
							name: true,
						},
					},
				},
			})

			if (!invite) {
				throw new BadRequestError('Invite not found.')
			}

			return reply.status(200).send({
				invite,
			})
		},
	)
}
