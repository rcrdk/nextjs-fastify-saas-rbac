import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'

import { FormError } from './form-error'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface FormErrorProps {
	list?: string[]
}

interface PasswordError {
	valid: boolean
	message: string
	showIcon: boolean
}

export function FormErrorPassword({ list }: FormErrorProps) {
	function renderClasses(success: boolean) {
		const base = 'flex items-center gap-1 text-xs'
		const status = success
			? 'text-green-500 dark:text-green-400'
			: 'text-red-500 dark:text-red-400'

		return `${base} ${status}`
	}

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
			return <FormError message="Error validating password." />
		}
	}

	if (errors.length === 0) {
		return null
	}

	if (errors.length === 1) {
		return (
			<div className={renderClasses(errors.at(0)!.valid)}>
				{errors.at(0)!.message}
			</div>
		)
	}

	return (
		<>
			<div className={renderClasses(false)}>
				<span>Enter a strong password.</span>
				<Popover>
					<PopoverTrigger className="text-foreground underline">
						(see rerquirements)
					</PopoverTrigger>

					<PopoverContent className="w-auto space-y-1 rounded border bg-white p-4 dark:bg-black">
						{errors.map((error) => (
							<div key={error.message} className={renderClasses(error.valid)}>
								{error.showIcon && error.valid && <IconCircleCheck size={16} />}
								{error.showIcon && !error.valid && <IconCircleX size={16} />}
								{error.message}
							</div>
						))}
					</PopoverContent>
				</Popover>
			</div>
		</>
	)
}
