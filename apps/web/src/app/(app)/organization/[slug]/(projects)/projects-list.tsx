import { IconArrowRight, IconUser } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'

import { getCurrentOrganization } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/http/get-projects'
import { getAvatarUrl } from '@/utils/get-avatar-url'

dayjs.extend(relativeTime)

export async function ProjectsList() {
	const currentOrganization = await getCurrentOrganization()

	const { projects } = await getProjects({
		organizationSlug: currentOrganization!,
	})

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{projects.map((project) => (
				<Card key={project.id} className="flex flex-col">
					<CardHeader className="flex-grow">
						<CardTitle className="text-lg leading-snug first-letter:uppercase">
							{project.name}
						</CardTitle>
						<CardDescription className="line-clamp-2 leading-relaxed">
							{project.description}
						</CardDescription>
					</CardHeader>

					<CardFooter className="flex items-center gap-1.5">
						<Avatar className="size-5">
							<AvatarImage
								src={getAvatarUrl(project.owner.avatarUrl, project.owner.email)}
							/>

							<AvatarFallback>
								<IconUser size={16} className="text-muted-foreground/50" />
							</AvatarFallback>
						</Avatar>

						<span className="text-balance text-xs text-muted-foreground">
							<span className="font-medium text-foreground">
								{project.owner.name}
							</span>{' '}
							{dayjs(project.createdAt).fromNow()}
						</span>

						<Button
							size="xs"
							variant="outline"
							className="ml-auto gap-2"
							asChild
						>
							<Link
								href={`/organization/${currentOrganization}/project/${project.slug}`}
							>
								View
								<IconArrowRight size={12} />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			))}

			{projects.length === 0 && (
				<div className="rounded border p-4 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
					There are no projects in this organization.
				</div>
			)}
		</div>
	)
}
