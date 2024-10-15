import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '[Organization]',
}

export default async function Projects() {
	return (
		<div className="w-full space-y-4">
			<h1 className="text-center text-2xl font-bold">Organization projects</h1>
		</div>
	)
}
