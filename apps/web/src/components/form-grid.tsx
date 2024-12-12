import type { ReactNode } from 'react'

interface FormGridProps {
	children: ReactNode
	className?: string
}

export function FormGrid({ children, className }: FormGridProps) {
	return (
		<div
			className={`grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
		>
			{children}
		</div>
	)
}
