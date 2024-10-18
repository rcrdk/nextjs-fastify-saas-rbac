'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<typeof Link> {
	includes?: string
}

export function NavLink(props: NavLinkProps) {
	const pathname = usePathname()

	let isCurrent = false

	if (props.includes) {
		isCurrent =
			props.href.toString() === pathname || pathname.includes(props.includes)
	} else {
		isCurrent = props.href.toString() === pathname
	}

	return (
		<Link
			{...props}
			data-current={isCurrent}
			className={[
				'data-[current=true]:before:inset-b-0 relative rounded py-5 text-sm text-muted-foreground outline-none transition-colors before:absolute before:inset-x-0 before:bottom-0 before:hidden before:border-b-[3px] hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary data-[current=true]:text-foreground data-[current=true]:before:block',
				props.className,
			].join(' ')}
		></Link>
	)

	// className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
}
