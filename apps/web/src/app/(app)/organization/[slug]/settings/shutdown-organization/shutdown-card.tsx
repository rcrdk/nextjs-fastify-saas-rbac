'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { ShutdownOrganizationButton } from './shutdown-button'

export function ShutdownOrganization() {
	return (
		<Card className="items-center justify-between md:flex">
			<CardHeader>
				<CardTitle>Shutdown Organization</CardTitle>
				<CardDescription className="text-balance">
					This will delete all organization data including all projects. You
					cannot undo this action.
				</CardDescription>
			</CardHeader>

			<CardContent className="md:p-5">
				<ShutdownOrganizationButton />
			</CardContent>
		</Card>
	)
}
