/* eslint-disable prettier/prettier */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<typeof Link> {
	current?: string | string[]
}

export function NavLink(props: NavLinkProps) {
	const pathname = usePathname()

	let isCurrentRoute = false

	if (props.current && typeof props.current === 'string') {
		isCurrentRoute = props.href.toString() === pathname || pathname.includes(props.current)
	} else if (props.current && typeof props.current === 'object') {
		isCurrentRoute = props.href.toString() === pathname || !!props.current.find((item) => pathname.includes(item)) 
	} else {
		isCurrentRoute = props.href.toString() === pathname
	}

	return (
		<Link
			{...props}
			data-current={isCurrentRoute}
			className={['data-[current=true]:before:inset-b-0 relative z-0 rounded pt-4 pb-5 sm:py-5 text-sm text-muted-foreground outline-none transition-colors before:absolute before:inset-x-0 before:bottom-0 before:hidden before:border-b-[3px] before:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary data-[current=true]:text-foreground data-[current=true]:before:block', props.className].join(' ')}
		/>
	)
}
