'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'

import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function ThemeSwitcher() {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="size-9">
					<IconSun className="block dark:hidden" />
					<IconMoon className="hidden dark:block" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="center" className="min-w-24 select-none">
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className="cursor-pointer justify-center"
				>
					Light
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className="cursor-pointer justify-center"
				>
					Dark
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className="cursor-pointer justify-center"
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
