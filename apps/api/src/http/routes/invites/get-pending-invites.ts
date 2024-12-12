import { rolesSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getPendingInvites(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			'/pending-invites',
			{
				schema: {
					tags: ['Invites'],
					summary: 'Get all user pending invites.',
					security: [{ bearerAuth: [] }],
					response: {
						200: z.object({
							invites: z.array(
								z.object({
									id: z.string().uuid(),
									email: z.string().email(),
									role: rolesSchema,
									createdAt: z.date(),
									author: z
										.object({
											id: z.string().uuid(),
											name: z.string().nullable(),
											avatarUrl: z.string().nullable(),
										})
										.nullable(),
									organization: z.object({
										name: z.string(),
									}),
								}),
							),
						}),
					},
				},
			},
			async (request) => {
				const userId = await request.getCurrentUserId()

				const user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				})

				if (!user) {
					throw new BadRequestError(errors.user.NOT_FOUND)
				}

				const invites = await prisma.invite.findMany({
					where: {
						email: user.email,
					},
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

				return { invites }
			},
		)
}
