import './globals.css'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
