import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import fastifyMultipart from '@fastify/multipart'
import { env } from '@saas/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { R2 } from '@/lib/cloudflare-r2'
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
					await R2.send(
						new PutObjectCommand({
							Bucket: env.AWS_BUCKET,
							Key: fileName,
							ContentType: mimeType,
							Body: fileBuffer,
						}),
					)
				} catch (error) {
					console.error(error)

					throw new BadRequestError(
						'An unexpeted error occoured on during upload',
					)
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
						const fileNameToDelete = entityHasAnAvatar.name.replace(
							'{AWS}/',
							'',
						)

						await R2.send(
							new DeleteObjectCommand({
								Bucket: env.AWS_BUCKET,
								Key: fileNameToDelete,
							}),
						)
					} catch (error) {
						console.error(error)

						throw new BadRequestError(
							'An unexpeted error occoured on during delete file',
						)
					}
				}

				const { name: newAvatarName } = await prisma.avatar.create({
					data: {
						name: `{AWS}/${fileName}`,
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
							avatarUrl: newAvatarName,
						},
					})
				}

				return reply.status(201).send()
			},
		)
}
