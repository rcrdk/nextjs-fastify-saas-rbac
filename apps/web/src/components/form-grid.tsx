import { ReactNode } from 'react'

interface FormGridProps {
	children: ReactNode
}

export function FormGrid({ children }: FormGridProps) {
	return (
		<div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
			{children}
		</div>
	)
}
