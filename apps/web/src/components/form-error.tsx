interface FormErrorProps {
	message?: string[]
}

export function FormError({ message }: FormErrorProps) {
	return message ? (
		<p className="text-xs text-red-500 dark:text-red-400">{message.at(0)}</p>
	) : null
}
