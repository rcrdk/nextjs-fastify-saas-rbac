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
					containerClassName="font-medium text-sm antialiased rounded text-balance text-center"
					toastOptions={{
						success: {
							style: { padding: '8px 24px', gap: '12px', maxWidth: '290px' },
							duration: 5000,
							icon: (
								<IconCircleCheck className="size-7 flex-shrink-0 text-green-500" />
							),
						},
						error: {
							style: { padding: '8px 24px', gap: '12px', maxWidth: '290px' },
							duration: 5000,
							icon: (
								<IconCircleX className="size-7 flex-shrink-0 text-red-500" />
							),
						},
					}}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
