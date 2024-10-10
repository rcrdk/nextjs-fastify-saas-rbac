import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function resetPassword(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/password/reset',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Reset user password.',
				body: z.object({
					code: z.string(),
					password: z.string().min(6),
				}),
				response: {
					204: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { code, password } = request.body

			const tokenFromCode = await prisma.token.findUnique({
				where: { id: code },
			})

			if (!tokenFromCode) {
				throw new UnauthorizedError()
			}

			const hashedPassword = await hash(password, 8)

			await prisma.$transaction([
				prisma.user.update({
					where: {
						id: tokenFromCode.userId,
					},
					data: {
						passwordHash: hashedPassword,
					},
				}),
				prisma.token.delete({
					where: {
						id: code,
					},
				}),
			])

			return reply.status(204).send()
		},
	)
}
