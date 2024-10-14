import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth'

type AuthLayoutProps = Readonly<{
	children: React.ReactNode
}>

export default function AuthLayout({ children }: AuthLayoutProps) {
	if (isAuthenticated()) {
		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
			<div className="w-full max-w-xs">{children}</div>
		</div>
	)
}
