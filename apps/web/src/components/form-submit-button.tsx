import { IconLoader2 } from '@tabler/icons-react'
import { ComponentProps } from 'react'

import { Button } from './ui/button'

interface FormSubmitButtonProps extends ComponentProps<typeof Button> {
	loading?: boolean
	loadingLabel?: string
}

export function FormSubmitButton({
	loading = false,
	loadingLabel = 'Submitting data...',
	...props
}: FormSubmitButtonProps) {
	return (
		<Button
			{...props}
			type="submit"
			disabled={loading}
			className={`gap-2 ${props.className}`}
		>
			{loading ? (
				<>
					<IconLoader2 size={20} className="animate-spin duration-1000" />
					{loadingLabel}
				</>
			) : (
				props.children
			)}
		</Button>
	)
}
