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

export async function generateMetadata(): Promise<Metadata> {
	const slug = getCurrentOrganization()

	const { organization } = await getOrganization(slug!)

	return {
		title: `${organization.name} Settings`,
	}
}

export default async function Settings() {
	const currentOrganization = getCurrentOrganization()
	const permissions = await ability()

	const canUpdateOrganization = permissions?.can('update', 'Organization')
	const canShutdownOrganization = permissions?.can('delete', 'Organization')
	const canGetBilling = permissions?.can('get', 'Billing')

	const { organization } = await getOrganization(currentOrganization!)

	return (
		<div className="w-full space-y-6 self-start sm:space-y-8">
			<h1 className="text-2xl font-bold">Organization Settings</h1>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
					<Card className="items-center justify-between md:flex lg:col-span-2">
						<CardHeader>
							<CardTitle>Shutdown Organization</CardTitle>
							<CardDescription className="text-balance">
								This will delete all organization data including all projects.
								You cannot undo this action.
							</CardDescription>
						</CardHeader>

						<CardContent className="md:p-6">
							<ShutdownOrganizationButton />
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
