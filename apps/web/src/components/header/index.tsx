import { IconSlash } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import brandLogo from '@/assets/brand-logo.svg'
import { ability } from '@/auth'

import { PendingInvites } from '../pending-invites'
import { Separator } from '../ui/separator'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme-switcher'

export async function Header() {
	const permissions = await ability()

	return (
		<header className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-b pb-4">
			<div className="flex items-center">
				<Link
					href="/"
					className="shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<Image
						src={brandLogo}
						alt=""
						className="size-10 select-none dark:invert"
						priority
					/>
				</Link>

				<IconSlash
					className="ml-3 -rotate-[24deg] text-border"
					strokeWidth={1}
				/>

				<OrganizationSwitcher />
				{permissions?.can('get', 'Project') && (
					<>
						<IconSlash
							className="-rotate-[24deg] text-border"
							strokeWidth={1}
						/>
						<ProjectSwitcher />
					</>
				)}
			</div>

			<div className="flex items-center gap-1">
				<PendingInvites />
				<ThemeSwitcher />
				<Separator orientation="vertical" className="ml-2 mr-3 h-5" />
				<ProfileButton />
			</div>
		</header>
	)
}
