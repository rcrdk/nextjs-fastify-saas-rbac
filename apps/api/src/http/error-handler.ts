import type { FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

import { errors } from '@/errors/messages'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: errors.api.VALIDATION_ERROR,
			errors: error.validation,
		})
	}

	if (error instanceof BadRequestError) {
		return reply.status(400).send({
			message: error.message,
		})
	}

	if (error instanceof UnauthorizedError) {
		return reply.status(401).send({
			message: error.message,
		})
	}

	console.error(error)
	// send error to some observability plattform`

	return reply.status(500).send({
		message: errors.api.SERVER_ERROR,
	})
}
