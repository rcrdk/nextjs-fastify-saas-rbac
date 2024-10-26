import { IconPlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { ability, getCurrentOrganization } from '@/auth'
import { Button } from '@/components/ui/button'
import { getOrganization } from '@/http/organizations/get-organization'

import { ProjectsList } from './projects-list'

export async function generateMetadata(): Promise<Metadata> {
	const currentOrganization = await getCurrentOrganization()

	const { organization } = await getOrganization({
		organizationSlug: currentOrganization!,
	})

	return {
		title: `${organization.name} Projects`,
	}
}

export default async function Projects() {
	const currentOrganization = await getCurrentOrganization()
	const permissions = await ability()

	return (
		<div className="w-full space-y-6 self-start sm:space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Projects</h1>

				{permissions?.can('create', 'Project') && (
					<Button size="sm" asChild>
						<Link
							href={`/organization/${currentOrganization}/create-project`}
							className="gap-2"
						>
							<IconPlus size={20} />
							Create a new project
						</Link>
					</Button>
				)}
			</div>

			{permissions?.can('get', 'Project') ? (
				<ProjectsList />
			) : (
				<div className="rounded border p-5 text-sm text-muted-foreground">
					You are not allowed to see organization projects.
				</div>
			)}
		</div>
	)
}
