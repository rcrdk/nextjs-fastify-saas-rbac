'use client'

import {
	IconBriefcase,
	IconCirclePlus,
	IconSelector,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/projects/get-projects'
import { getAvatarUrl } from '@/utils/get-avatar-url'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export function ProjectSwitcher() {
	const { slug: organizationSlug, project: projectSlug } = useParams<{
		slug: string
		project: string
	}>()

	const { data, isLoading } = useQuery({
		queryKey: [organizationSlug, 'projects'],
		queryFn: () => getProjects({ organizationSlug }),
		enabled: !!organizationSlug,
	})

	const currentProject = data?.projects.find(
		(item) => item.slug === projectSlug,
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="flex w-full select-none items-center gap-1 rounded-sm bg-foreground/5 px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none sm:w-auto sm:max-w-[288px] sm:bg-transparent md:max-w-[204px] lg:max-w-[264px]"
				disabled={isLoading}
			>
				<Avatar
					className={!currentProject || isLoading ? 'hidden' : 'mr-1 size-5'}
				>
					{currentProject?.avatarUrl && (
						<AvatarImage src={getAvatarUrl(currentProject.avatarUrl)} />
					)}
					<AvatarFallback>
						<IconBriefcase size={12} className="text-foreground opacity-50" />
					</AvatarFallback>
				</Avatar>

				{isLoading && (
					<>
						<Skeleton className="mr-1 size-5 rounded-full" />
						<Skeleton className="h-3 w-28" />
					</>
				)}

				{!isLoading && !currentProject && (
					<span className="whitespace-nowrap pr-1 text-muted-foreground">
						Select project
					</span>
				)}

				{!isLoading && currentProject && (
					<span className="truncate">{currentProject.name}</span>
				)}

				<IconSelector size={16} className="ml-auto shrink-0 text-current" />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="center"
				sideOffset={8}
				collisionPadding={20}
				className="w-[calc(100vw-40px)] select-none sm:w-auto sm:max-w-[328px] md:max-w-[264px] lg:max-w-[304px]"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Projects</DropdownMenuLabel>

					{data?.projects.map((item) => (
						<DropdownMenuItem key={item.id} asChild>
							<Link
								href={`/organization/${organizationSlug}/project/${item.slug}`}
								className="cursor-pointer"
							>
								<Avatar className="mr-2 size-5">
									{item.avatarUrl && (
										<AvatarImage src={getAvatarUrl(item.avatarUrl)} />
									)}
									<AvatarFallback>
										<IconBriefcase
											size={12}
											className="text-foreground opacity-50"
										/>
									</AvatarFallback>
								</Avatar>

								<span className="block truncate">{item.name}</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link
						href={`/organization/${organizationSlug}/create-project`}
						className="cursor-pointer font-medium"
					>
						<IconCirclePlus size={20} className="mr-2" />
						Create a project
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
