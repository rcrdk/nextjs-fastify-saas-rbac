/* eslint-disable prettier/prettier */

import fastifyMultipart from '@fastify/multipart'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { deleteObjectR2, putObjectR2 } from '@/lib/cloudflare-r2'
import { prisma } from '@/lib/prisma'
import { generateAvatar } from '@/utils/generate-avatar'

import { BadRequestError } from './_errors/bad-request-error'

export async function uploadAvatar(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.register(fastifyMultipart)
		.post(
			'/upload/:receipient/:receipientId',
			{
				schema: {
					tags: ['Upload'],
					summary: 'Upload avatar image to entity.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						receipientId: z.string().uuid(),
						receipient: z
							.enum(['user', 'organization', 'project'])
							.transform((value) => {
								switch (value) {
									case 'user':
										return 'USER'
									case 'organization':
										return 'ORGANIZATION'
									case 'project':
										return 'PROJECT'
								}
							}),
					}),
				},
			},
			async (request, reply) => {
				const { receipient, receipientId } = request.params

				const file = await request.file({
					limits: {
						fileSize: 1000 * 100 * 10 * 2, // ~2mb
					},
				})

				const { fileName, mimeType, fileBuffer } = await generateAvatar(
					app,
					file,
				)

				try {
					await putObjectR2(fileName, mimeType, fileBuffer)
				} catch (error) {
					console.error(error)
					throw new BadRequestError(errors.files.UPLOAD)
				}

				const entityHasAnAvatar = await prisma.avatar.findUnique({
					where: {
						receipient_receipientId: {
							receipient,
							receipientId,
						},
					},
				})

				if (entityHasAnAvatar) {
					await prisma.avatar.delete({
						where: {
							receipient_receipientId: {
								receipient,
								receipientId,
							},
						},
					})

					try {
						const fileNameToDelete = entityHasAnAvatar.name
						await deleteObjectR2(fileNameToDelete)
					} catch (error) {
						console.error(error)
						throw new BadRequestError(errors.files.DELETE)
					}
				}

				const { name: newAvatar } = await prisma.avatar.create({
					data: {
						name: fileName,
						receipient,
						receipientId,
					},
				})

				if (receipient === 'USER') {
					await prisma.user.update({
						where: {
							id: receipientId,
						},
						data: {
							avatarUrl: `{AWS}/${newAvatar}`,
						},
					})
				}

				if (receipient === 'ORGANIZATION') {
					await prisma.organization.update({
						where: {
							id: receipientId,
						},
						data: {
							avatarUrl: `{AWS}/${newAvatar}`,
						},
					})
				}

				if (receipient === 'PROJECT') {
					await prisma.project.update({
						where: {
							id: receipientId,
						},
						data: {
							avatarUrl: `{AWS}/${newAvatar}`,
						},
					})
				}

				return reply.status(201).send()
			},
		)
}
