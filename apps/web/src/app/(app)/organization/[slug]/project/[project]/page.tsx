import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '[Project] | [Organization]',
}

export default async function Project() {
	return (
		<div className="w-full space-y-4">
			<h1 className="text-center text-2xl font-bold">Project</h1>
		</div>
	)
}
