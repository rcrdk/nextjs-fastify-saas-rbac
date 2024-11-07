import { redirect } from 'next/navigation'
import { use } from 'react'

import { isAuthenticated } from '@/auth'

type AuthLayoutProps = Readonly<{
	children: React.ReactNode
}>

export default function AuthLayout({ children }: AuthLayoutProps) {
	const isAlreadyAuthenticated = use(isAuthenticated())

	if (isAlreadyAuthenticated) {
		redirect('/')
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center px-4 py-6">
			<div className="w-full max-w-sm">{children}</div>
		</div>
	)
}
