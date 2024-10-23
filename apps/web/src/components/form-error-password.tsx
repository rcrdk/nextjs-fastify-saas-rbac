import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'

import { FormError } from './form-error'

interface FormErrorProps {
	list?: string[]
}

interface PasswordError {
	valid: boolean
	message: string
	showIcon: boolean
}

export function FormErrorPassword({ list }: FormErrorProps) {
	let errors: PasswordError[] = []

	if (list?.at(0)) {
		try {
			errors = Object.values(JSON.parse(list.at(0)!))
			errors.sort((a, b) => {
				if (a.valid && !b.valid) {
					return 1
				} else if (!a.valid && b.valid) {
					return -1
				} else {
					return 0
				}
			})
		} catch {
			return <FormError message={['Error validating password.']} />
		}
	}

	return (
		<>
			{errors.map((error) => (
				<div
					key={error.message}
					className={`flex items-center gap-1 ${
						error.valid
							? 'text-green-500 dark:text-green-400'
							: 'text-red-500 dark:text-red-400'
					}`}
				>
					{error.showIcon && error.valid && <IconCircleCheck size={16} />}
					{error.showIcon && !error.valid && <IconCircleX size={16} />}
					<p className="text-xs">{error.message}</p>
				</div>
			))}
		</>
	)
}
