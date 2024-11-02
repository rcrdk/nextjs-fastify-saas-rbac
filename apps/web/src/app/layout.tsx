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
			type: 'image/svg+xml',
		},
		{
			url: '/favicon-dark.svg',
			media: '(prefers-color-scheme: dark)',
			rel: 'icon',
			type: 'image/svg+xml',
		},
		{
			url: '/apple-touch-icon.png',
			rel: 'apple-touch-icon',
			sizes: '180x180',
			type: 'image/png',
		},
		{
			url: '/favicon-96x96.png',
			rel: 'icon',
			sizes: '96x96',
			type: 'image/png',
		},
		{
			url: '/favicon.ico',
			rel: 'shortcut icon',
			type: 'image/x-icon',
			sizes: '16x16 32x32 48x48',
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
