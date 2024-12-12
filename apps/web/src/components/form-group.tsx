import type { ReactNode } from 'react'

interface FormGroupProps {
	children: ReactNode
	className?: string
}

export function FormGroup({ children, className }: FormGroupProps) {
	return <div className={`space-y-1 ${className}`}>{children}</div>
}
