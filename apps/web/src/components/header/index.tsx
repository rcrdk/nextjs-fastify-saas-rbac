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
		<header className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between border-b pb-3 sm:pb-4">
			<Link
				href="/"
				className="order-1 shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				<Image
					src={brandLogo}
					alt=""
					className="size-9 select-none dark:invert md:size-9 lg:size-10"
					priority
				/>
			</Link>

			<div className="order-3 flex w-full flex-grow flex-col items-center gap-1 pt-3 sm:flex-row sm:gap-0 sm:pt-4 md:order-2 md:w-auto md:pt-0">
				<IconSlash
					className="ml-3 hidden -rotate-[24deg] text-border md:block"
					strokeWidth={1}
				/>

				<OrganizationSwitcher />

				{permissions?.can('get', 'Project') && (
					<>
						<IconSlash
							className="hidden shrink-0 -rotate-[24deg] text-border sm:block"
							strokeWidth={1}
						/>
						<ProjectSwitcher />
					</>
				)}
			</div>

			<div className="order-2 flex items-center gap-1 md:order-3">
				<PendingInvites />
				<ThemeSwitcher />
				<Separator
					orientation="vertical"
					className="ml-1 mr-2 h-5 sm:ml-2 sm:mr-3"
				/>
				<ProfileButton />
			</div>
		</header>
	)
}
