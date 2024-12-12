import type { z } from 'zod'

import { validation } from '@/messages/validation'

export const validateStrongPasswordSchema = (
	{ password }: Record<'password', string>,
	checkPassComplexity: z.RefinementCtx,
) => {
	if (!password.length) {
		checkPassComplexity.addIssue({
			code: 'custom',
			path: ['password'],
			message: JSON.stringify({
				minLength: {
					valid: false,
					message: validation.PASSWORD,
					showIcon: false,
				},
			}),
		})
	}

	const hasUppercase = (ch: string) => /[A-Z]/.test(ch)
	const hasLowercase = (ch: string) => /[a-z]/.test(ch)
	// eslint-disable-next-line prettier/prettier
	const hasSpecial = (ch: string) => /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch)

	let countUppercase = 0
	let countLowercase = 0
	let countNumbers = 0
	let countSpecial = 0

	for (let i = 0; i < password.length; i++) {
		const ch = password.charAt(i)
		if (!isNaN(+ch)) countNumbers++
		else if (hasUppercase(ch)) countUppercase++
		else if (hasLowercase(ch)) countLowercase++
		else if (hasSpecial(ch)) countSpecial++
	}

	let errors = {
		totalNumber: {
			valid: true,
			message: validation.PASSWORD_NUMBER,
			showIcon: true,
		},
		upperCase: {
			valid: true,
			message: validation.PASSWORD_UPPER,
			showIcon: true,
		},
		lowerCase: {
			valid: true,
			message: validation.PASSWORD_LOWER,
			showIcon: true,
		},
		specialCh: {
			valid: true,
			message: validation.PASSWORD_SPECIAL,
			showIcon: true,
		},
		minLength: {
			valid: true,
			message: validation.PASSWORD_LENGTH,
			showIcon: true,
		},
	}

	if (countNumbers < 1) {
		errors = {
			...errors,
			totalNumber: { ...errors.totalNumber, valid: false },
		}
	}

	if (countUppercase < 1) {
		errors = {
			...errors,
			upperCase: {
				...errors.upperCase,
				valid: false,
			},
		}
	}

	if (countLowercase < 1) {
		errors = {
			...errors,
			lowerCase: {
				...errors.lowerCase,
				valid: false,
			},
		}
	}

	if (countSpecial < 1) {
		errors = {
			...errors,
			specialCh: {
				...errors.specialCh,
				valid: false,
			},
		}
	}

	if (password.length < 6) {
		errors = {
			...errors,
			minLength: {
				...errors.minLength,
				valid: false,
			},
		}
	}

	if (
		countNumbers < 1 ||
		countUppercase < 1 ||
		countLowercase < 1 ||
		countSpecial < 1 ||
		password.length < 6
	) {
		checkPassComplexity.addIssue({
			code: 'custom',
			path: ['password'],
			message: JSON.stringify(errors),
		})
	}
}
