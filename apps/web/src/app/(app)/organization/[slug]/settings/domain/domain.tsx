import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import type { GetOrganizationItemRequest } from '@/http/organizations/get-organization'

import { DomainDnsSettings } from './dns-settings'
import { RemoveDomain } from './domain-remove'
import { DomainForm } from './form'

interface DomainProps {
	organization: GetOrganizationItemRequest
}

export function Domain({ organization }: DomainProps) {
	const wasValidated = !!organization.domain && !!organization.domainValidatedAt

	return (
		<Card className={wasValidated ? 'grid grid-cols-[1fr_auto]' : ''}>
			<CardHeader className={wasValidated ? 'order-1 pb-0' : 'order-1'}>
				<CardTitle>Domain</CardTitle>
				<CardDescription>Set up your organization domain.</CardDescription>
			</CardHeader>

			{wasValidated && <RemoveDomain />}

			<div
				className={
					wasValidated ? 'order-3 col-span-2' : 'grid-cols-2 border-t lg:grid'
				}
			>
				{!wasValidated && (
					<DomainDnsSettings code={organization.domainValidationId} />
				)}

				<DomainForm
					domainValidated={wasValidated}
					initialData={{
						domain: organization.domain,
						shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
					}}
				/>
			</div>
		</Card>
	)
}
