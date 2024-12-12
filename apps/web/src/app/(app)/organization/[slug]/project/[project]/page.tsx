import { projectSchema } from '@saas/auth'
import { IconBriefcase, IconUser } from '@tabler/icons-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ability, getCurrentOrganization } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getOrganization } from '@/http/organizations/get-organization'
import type { GetProjectItemResponse } from '@/http/projects/get-project'
import { getProject } from '@/http/projects/get-project'
import { getAvatarUrl } from '@/utils/get-avatar-url'
import { getFirstName } from '@/utils/get-first-name'
import { timeFromNow, timeFullFormated } from '@/utils/time-formated'

import { ProjectDropdownSettings } from './dropdown'
import { AvatarForm } from './update-avatar'

type Params = Promise<{ project: string }>

export async function generateMetadata({
	params,
}: {
	params: Params
}): Promise<Metadata> {
	const currentOrganization = await getCurrentOrganization()
	const { project: projectSlug } = await params

	const [{ organization }, { project }] = await Promise.all([
		getOrganization({
			organizationSlug: currentOrganization!,
		}),
		getProject({
			organizationSlug: currentOrganization!,
			projectSlug,
		}),
	])

	return {
		title: `${project.name} Project | ${organization.name}`,
	}
}

export default async function Project({ params }: { params: Params }) {
	const currentOrganization = await getCurrentOrganization()
	const { project: projectSlug } = await params

	let project: GetProjectItemResponse

	try {
		const { project: projectData } = await getProject({
			organizationSlug: currentOrganization!,
			projectSlug,
		})

		project = projectData
	} catch (error) {
		redirect(`/organization/${currentOrganization}`)
	}

	const permissions = await ability()

	const authProject = projectSchema.parse(project)

	const canUpdateProject = !!permissions?.can('update', authProject)
	const canDeleteProject = !!permissions?.can('delete', authProject)

	const projectTimestampsTitle = `Created on ${timeFullFormated(project.createdAt)}. Last updated on ${timeFullFormated(project.updatedAt)}.`

	return (
		<div className="w-full space-y-6 self-start sm:space-y-8">
			<div className="flex gap-5 sm:gap-7">
				{canUpdateProject ? (
					<AvatarForm
						organizationSlug={currentOrganization!}
						initialData={{
							avatarUrl: project.avatarUrl,
							projectId: project.id,
						}}
					/>
				) : (
					<Avatar className="size-24 self-start sm:size-32">
						{project.avatarUrl && (
							<AvatarImage src={getAvatarUrl(project.avatarUrl)} />
						)}
						<AvatarFallback>
							<IconBriefcase
								size={64}
								stroke={1.25}
								className="text-muted-foreground opacity-50"
							/>
						</AvatarFallback>
					</Avatar>
				)}

				<div className="flex-grow space-y-1 self-center">
					<h1 className="text-balance text-xl font-bold sm:text-2xl">
						{project.name}
					</h1>

					<p className="hidden text-balance text-muted-foreground sm:block">
						{project.description}
					</p>

					<div
						className="hidden items-center gap-2 pt-3 sm:flex"
						title={projectTimestampsTitle}
					>
						<Avatar className="size-7">
							<AvatarImage
								src={getAvatarUrl(
									project.owner?.avatarUrl,
									project.owner?.email,
								)}
							/>
							<AvatarFallback>
								<IconUser size={20} className="text-muted-foreground/50" />
							</AvatarFallback>
						</Avatar>
						<span className="text-sm">
							{getFirstName(project.owner?.name, 'Someone')}
						</span>
						<p className="text-xs text-muted-foreground">
							{timeFromNow(project.createdAt)}
						</p>
					</div>
				</div>

				{(canUpdateProject || canDeleteProject) && (
					<ProjectDropdownSettings
						organizationSlug={currentOrganization!}
						project={project}
						permissions={{
							canUpdate: canUpdateProject,
							canDelete: canDeleteProject,
						}}
					/>
				)}
			</div>

			<div className="space-y-2 border-t pt-5 sm:hidden">
				<p className="text-balance text-muted-foreground">
					{project.description}
				</p>

				<div
					className="flex items-center gap-2 pt-3"
					title={projectTimestampsTitle}
				>
					<Avatar className="size-7">
						<AvatarImage
							src={getAvatarUrl(project.owner?.avatarUrl, project.owner?.email)}
						/>
						<AvatarFallback>
							<IconUser size={20} className="text-muted-foreground/50" />
						</AvatarFallback>
					</Avatar>
					<span className="text-sm">
						{getFirstName(project.owner?.name, 'Someone')}
					</span>
					<p className="text-xs text-muted-foreground">
						{timeFromNow(project.createdAt)}
					</p>
				</div>
			</div>

			<div className="rounded border p-5 text-center text-sm text-muted-foreground">
				I don&apos;t know what a project exactly is. Do you?
			</div>
		</div>
	)
}
