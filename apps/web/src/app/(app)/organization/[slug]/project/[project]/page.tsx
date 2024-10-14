import { Metadata } from 'next'

import { Header } from '@/components/header'

// set metadata title
export const metadata: Metadata = {
	title: '[Project]',
}

export default async function Project() {
	return (
		<div className="flex min-h-screen flex-col px-5 py-4 md:px-8">
			<Header />

			<main className="mx-auto flex w-full max-w-[1200px] flex-grow items-center py-8">
				<div className="w-full space-y-4">
					<h1 className="text-center text-2xl font-bold">Project</h1>
				</div>
			</main>
		</div>
	)
}
