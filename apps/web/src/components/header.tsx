import { IconSlash } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import brandLogo from '@/assets/brand-logo.svg'
import { ability } from '@/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
	const permissions = await ability()

	return (
		<header className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-b pb-4">
			<div className="flex items-center gap-3">
				<Link
					href="/"
					className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<Image
						src={brandLogo}
						alt=""
						className="size-10 select-none dark:invert"
					/>
				</Link>

				<IconSlash className="-rotate-[24deg] text-border" />

				<OrganizationSwitcher />
				{permissions?.can('get', 'Project') && <p>Projects</p>}
			</div>

			<div className="flex items-center gap-4">
				<ThemeSwitcher />
				<Separator orientation="vertical" className="h-5" />
				<ProfileButton />
			</div>
		</header>
	)
}
