import { IconLoader2 } from '@tabler/icons-react'
import type { ComponentProps } from 'react'

import { Button } from './ui/button'

interface FormSubmitButtonProps extends ComponentProps<typeof Button> {
	loading?: boolean
}

export function FormSubmitButton({
	loading = false,

	...props
}: FormSubmitButtonProps) {
	return (
		<Button
			{...props}
			type="submit"
			disabled={loading || props.disabled}
			className={`w-full min-w-24 gap-2 sm:w-auto ${props.className}`}
		>
			{loading ? (
				<IconLoader2 size={20} className="animate-spin duration-1000" />
			) : (
				props.children
			)}
		</Button>
	)
}
