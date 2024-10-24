interface FormErrorProps {
	message?: string[] | string
}

export function FormError({ message }: FormErrorProps) {
	return message ? (
		<p className="text-xs text-red-500 dark:text-red-400">
			{typeof message === 'string' ? message : message.at(0)}
		</p>
	) : null
}
