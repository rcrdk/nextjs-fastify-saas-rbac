/* eslint-disable prettier/prettier */
import { randomUUID } from 'node:crypto'

import type { MultipartFile } from '@fastify/multipart'
import type { FastifyInstance } from 'fastify'
import sharp from 'sharp'

import { errors } from '@/errors/messages'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

import { generateFilename } from './generate-filename'

export async function generateAvatar(
	app: FastifyInstance,
	file?: MultipartFile,
) {
	if (!file) {
		throw new BadRequestError(errors.files.NOT_FOUND)
	}

	let fileBuffer: Buffer

	try {
		fileBuffer = await file.toBuffer()
	} catch (error) {
		if (error instanceof app.multipartErrors.RequestFileTooLargeError) {
			throw new BadRequestError(errors.files.MAX_SIZE)
		}

		console.log(error)

		throw new BadRequestError(errors.files.PROCESSING)
	}

	const fileName = file.filename
	const fileMimeType = file.mimetype

	if (!/^image\/(jpeg|png)$/.test(fileMimeType)) {
		throw new BadRequestError(errors.files.FORMAT)
	}

	const fileNamePrefix = randomUUID()
	const uniqueFileName = generateFilename(`${fileNamePrefix}-${fileName}`)

	let transformedBuffer: Buffer

	try {
		transformedBuffer = await sharp(fileBuffer)
			.resize(600, 600)
			.jpeg()
			.toBuffer()
	} catch (error) {
		console.log(error)

		throw new BadRequestError(errors.files.PROCESSING)
	}

	return {
		fileName: uniqueFileName,
		mimeType: 'image/jpeg', // fileMimeType fixed since its converted
		fileBuffer: transformedBuffer,
	}
}
