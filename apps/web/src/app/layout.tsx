import './globals.css'

import type { Metadata } from 'next'

import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		template: '%s | Next.js + RBAC',
		default: 'Dashboard',
	},
	icons: [
		{
			url: '/favicon-light.svg',
			media: '(prefers-color-scheme: light)',
			rel: 'icon',
		},
		{
			url: '/favicon-dark.svg',
			media: '(prefers-color-scheme: dark)',
			rel: 'icon',
		},
	],
}

type RootLayoutProps = Readonly<{
	children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
