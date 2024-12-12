import type { Metadata } from 'next'

import { OrganizationForm } from '@/app/(app)/organization/form'
import { ability, getCurrentOrganization } from '@/auth'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/organizations/get-organization'

import { Avatar } from './avatar/avatar'
import { Billing } from './billing/billing'
import { Domain } from './domain/domain'
import { ShutdownOrganization } from './shutdown-organization/shutdown-card'

export async function generateMetadata(): Promise<Metadata> {
	const currentOrganization = await getCurrentOrganization()

	const { organization } = await getOrganization({
		organizationSlug: currentOrganization!,
	})

	return {
		title: `${organization.name} Settings`,
	}
}

export default async function OrganizationSettingsPage() {
	const currentOrganization = await getCurrentOrganization()
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

			<div className="space-y-5 md:space-y-8">
				{canUpdateOrganization && (
					<>
						<Avatar />

						<Card>
							<CardHeader>
								<CardTitle>About organization</CardTitle>
								<CardDescription>
									Update the informations of your organization.
								</CardDescription>
							</CardHeader>

							<OrganizationForm
								isUpdating
								initialData={{
									name: organization.name,
								}}
							/>
						</Card>
					</>
				)}

				{canUpdateOrganization && <Domain organization={organization} />}
				{canGetBilling && <Billing />}
				{canShutdownOrganization && <ShutdownOrganization />}
			</div>
		</div>
	)
}
