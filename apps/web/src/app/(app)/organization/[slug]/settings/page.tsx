import { Metadata } from 'next'

import { OrganizationForm } from '@/app/(app)/organization/form'
import { ability, getCurrentOrganization } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { Billing } from './billing'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export const metadata: Metadata = {
	title: '[Organization] settings',
}

export default async function Settings() {
	const currentOrganization = getCurrentOrganization()
	const permissions = await ability()

	const canUpdateOrganization = permissions?.can('update', 'Organization')
	const canShutdownOrganization = permissions?.can('delete', 'Organization')
	const canGetBilling = permissions?.can('get', 'Billing')

	const { organization } = await getOrganization({
		organization: currentOrganization!,
	})

	return (
		<div className="w-full space-y-8">
			<h1 className="text-2xl font-bold">Organization Settings</h1>

			<div className="space-y-8">
				{canUpdateOrganization && (
					<Card>
						<CardHeader>
							<CardTitle>Organization Details</CardTitle>
							<CardDescription>
								Update details and settings of your organization.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<OrganizationForm
								isUpdating
								initialData={{
									name: organization.name,
									domain: organization.domain,
									shouldAttachUsersByDomain:
										organization.shouldAttachUsersByDomain,
								}}
							/>
						</CardContent>
					</Card>
				)}

				{canGetBilling && <Billing />}

				{canShutdownOrganization && (
					<Card>
						<CardHeader>
							<CardTitle>Shutdown Organization</CardTitle>
							<CardDescription>
								This will delete all organization data including all projects.
								You cannot undo this action.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<ShutdownOrganizationButton />
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
