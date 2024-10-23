import Image from 'next/image'

import brandLogo from '@/assets/brand-logo.svg'

interface HeaderAuthProps {
	title: string
	description?: string
}

export function HeaderAuth({ title, description }: HeaderAuthProps) {
	return (
		<header className="flex flex-col items-center gap-2 pb-3">
			<Image
				src={brandLogo}
				alt=""
				className="size-10 select-none dark:invert md:size-11 lg:size-12"
				priority
			/>

			<h1 className="pt-2 text-xl font-bold">{title}</h1>
			{description && (
				<p className="text-balance text-center text-sm text-muted-foreground">
					{description}
				</p>
			)}
		</header>
	)
}
