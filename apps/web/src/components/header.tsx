import { IconSlash } from '@tabler/icons-react'
import Image from 'next/image'

import brandLogo from '@/assets/brand-logo.svg'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export function Header() {
	return (
		<header className="mx-auto flex max-w-[1200px] items-center justify-between">
			<div className="flex items-center gap-3">
				<Image
					src={brandLogo}
					alt=""
					className="size-10 select-none dark:invert"
				/>
				<IconSlash className="-rotate-[24deg] text-border" />
				<OrganizationSwitcher />
			</div>

			<div className="flex items-center gap-4">
				<ProfileButton />
			</div>
		</header>
	)
}
