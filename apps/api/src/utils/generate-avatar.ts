import { MultipartFile } from '@fastify/multipart'
import { FastifyInstance } from 'fastify'
import sharp from 'sharp'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

import { generateFilename } from './generate-filename'

export async function generateAvatar(
	app: FastifyInstance,
	file?: MultipartFile,
) {
	if (!file) {
		throw new BadRequestError('There is no file selected')
	}

	let fileBuffer: Buffer

	try {
		fileBuffer = await file.toBuffer()
	} catch (error) {
		if (error instanceof app.multipartErrors.RequestFileTooLargeError) {
			throw new BadRequestError('Your avatar must have less than 2mb')
		}

		console.log(error)

		throw new BadRequestError(
			'An unexpeted error occoured on processing your file',
		)
	}

	const fileName = file.filename
	const fileMimeType = file.mimetype

	if (!/^image\/(jpeg|png)$/.test(fileMimeType)) {
		throw new BadRequestError('The upload file selected is not a valid image')
	}

	const fileNamePrefix = new Date().getTime()
	const uniqueFileName = generateFilename(`${fileNamePrefix}-${fileName}`)

	let transformedBuffer: Buffer

	try {
		transformedBuffer = await sharp(fileBuffer)
			.resize(600, 600)
			.jpeg()
			.toBuffer()
	} catch (error) {
		console.log(error)

		throw new BadRequestError(
			'An unexpeted error occoured on processing your file',
		)
	}

	return {
		fileName: uniqueFileName,
		mimeType: 'image/jpeg', // fileMimeType
		fileBuffer: transformedBuffer,
	}
}
