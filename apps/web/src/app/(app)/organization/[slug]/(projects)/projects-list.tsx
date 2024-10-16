import { IconArrowRight } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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

dayjs.extend(relativeTime)

export async function ProjectsList() {
	const currentOrganization = getCurrentOrganization()

	const { projects } = await getProjects(currentOrganization!)

	return (
		<div className="grid grid-cols-3 gap-4">
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
							{project.owner.avatarUrl && (
								<AvatarImage src={project.owner.avatarUrl} />
							)}
							<AvatarFallback />
						</Avatar>

						<span className="text-balance text-xs text-muted-foreground">
							<span className="font-medium text-foreground">
								{project.owner.name}
							</span>{' '}
							{dayjs(project.createdAt).fromNow()}
						</span>

						<Button size="xs" variant="outline" className="ml-auto gap-2">
							View
							<IconArrowRight size={12} />
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}
