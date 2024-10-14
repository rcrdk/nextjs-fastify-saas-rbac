import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth'

export const metadata: Metadata = {
	title: {
		template: '%s | Next.js + RBAC',
		default: 'Dashboard',
	},
}

export default function AppLayout({
	children,
	sheet,
}: Readonly<{
	children: React.ReactNode
	sheet: React.ReactNode
}>) {
	if (!isAuthenticated()) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			{children}
			{sheet}
		</>
	)
}
