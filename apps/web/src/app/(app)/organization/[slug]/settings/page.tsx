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
import { DomainSettings } from './domain'
import { ShutdownOrganization } from './shutdown-organization'

export async function generateMetadata(): Promise<Metadata> {
	const currentOrganization = getCurrentOrganization()

	const { organization } = await getOrganization({
		organizationSlug: currentOrganization!,
	})

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

	const { organization } = await getOrganization({
		organizationSlug: currentOrganization!,
	})

	return (
		<div className="w-full space-y-6 self-start sm:space-y-8">
			<h1 className="text-2xl font-bold">Organization Settings</h1>

			<div className="space-y-8">
				{canUpdateOrganization && (
					<>
						<Card>
							<CardHeader>
								<CardTitle>Information</CardTitle>
								<CardDescription>
									Update details and settings of your organization.
								</CardDescription>
							</CardHeader>

							<CardContent>
								<OrganizationForm
									isUpdating
									initialData={{
										name: organization.name,
									}}
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Domain</CardTitle>
								<CardDescription>
									Set up your organization domain.
								</CardDescription>
							</CardHeader>

							<CardContent>
								<DomainSettings organization={organization} />
							</CardContent>
						</Card>
					</>
				)}

				{canGetBilling && <Billing />}

				{canShutdownOrganization && (
					<Card className="items-center justify-between md:flex">
						<CardHeader>
							<CardTitle>Shutdown Organization</CardTitle>
							<CardDescription className="text-balance">
								This will delete all organization data including all projects.
								You cannot undo this action.
							</CardDescription>
						</CardHeader>

						<CardContent className="md:p-6">
							<ShutdownOrganization />
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
