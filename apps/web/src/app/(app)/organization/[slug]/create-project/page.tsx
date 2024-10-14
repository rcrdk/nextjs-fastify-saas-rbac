import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ability } from '@/auth'
import { Header } from '@/components/header'

import { ProjectForm } from './form'

export const metadata: Metadata = {
	title: 'Create project',
}

export default async function CreateProject() {
	const permissions = await ability()

	if (permissions?.cannot('create', 'Project')) {
		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col px-5 py-4 md:px-8">
			<Header />

			<main className="mx-auto flex w-full max-w-[1200px] flex-grow items-center py-8">
				<div className="mx-auto w-full max-w-[480px] space-y-4">
					<h1 className="text-2xl font-bold">Create a project</h1>

					<ProjectForm />
				</div>
			</main>
		</div>
	)
}
