import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ability } from '@/auth'

import { ProjectForm } from '../project/form'

export const metadata: Metadata = {
	title: 'Create a Project',
}

export default async function CreateProject() {
	const permissions = await ability()

	if (permissions?.cannot('create', 'Project')) {
		redirect('/')
	}

	return (
		<div className="mx-auto w-full max-w-[480px] space-y-4">
			<h1 className="text-2xl font-bold">Create a project</h1>

			<ProjectForm />
		</div>
	)
}
