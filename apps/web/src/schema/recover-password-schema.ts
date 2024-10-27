import { z } from 'zod'

import { validation } from '@/messages/validation'

import { validateStrongPasswordSchema } from './helpers/validate-strong-password-schema'

export const recoverPasswordSchema = z
	.object({
		email: z.string().email(validation.VALID_EMAIL),
		code: z.string().uuid(validation.VALIDATION_CODE),
		password: z.string(),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: validation.PASSWORD_CONFIRMATION,
		path: ['password_confirmation'],
	})
	.superRefine(validateStrongPasswordSchema)
