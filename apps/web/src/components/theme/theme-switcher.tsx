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
				<Button variant="ghost" size="icon">
					<IconSun className="block dark:hidden" />
					<IconMoon className="hidden dark:block" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="select-none">
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className="cursor-pointer"
				>
					Light
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className="cursor-pointer"
				>
					Dark
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className="cursor-pointer"
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
