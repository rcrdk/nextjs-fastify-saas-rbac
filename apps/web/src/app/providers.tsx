'use client'

import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

import { queryClient } from '@/lib/react-query'

interface ProvidersProps {
	children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
			>
				{children}

				<Toaster
					position="top-center"
					containerStyle={{ top: '32px' }}
					containerClassName="font-medium text-sm antialiased rounded text-balance"
					toastOptions={{
						success: {
							duration: 5000,
							icon: (
								<IconCircleCheck className="flex-shrink-0 text-green-500" />
							),
						},
						error: {
							duration: 5000,
							icon: <IconCircleX className="flex-shrink-0 text-red-500" />,
						},
					}}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
