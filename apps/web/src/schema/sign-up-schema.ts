import { z } from 'zod'

import { validation } from '@/messages/validation'

import { validateStrongPasswordSchema } from './helpers/validate-strong-password-schema'

export const signUpSchema = z
	.object({
		name: z
			.string()
			.refine((value) => value.split(' ').length > 1, validation.FULL_NAME),
		email: z.string().email(validation.VALID_EMAIL),
		password: z.string(),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: validation.PASSWORD_CONFIRMATION,
		path: ['password_confirmation'],
	})
	.superRefine(validateStrongPasswordSchema)
