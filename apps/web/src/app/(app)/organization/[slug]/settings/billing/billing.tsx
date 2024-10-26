import { IconBriefcase, IconUsers } from '@tabler/icons-react'

import { getCurrentOrganization } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { getOrganizationBilling } from '@/http/organizations/get-billing'

export async function Billing() {
	const currentOrganization = await getCurrentOrganization()

	const { billing } = await getOrganizationBilling({
		organization: currentOrganization!,
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Billing</CardTitle>
				<CardDescription>
					Information about your organizations costs.
				</CardDescription>
			</CardHeader>

			<CardContent className="p-0">
				<div className="overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="pl-5" colSpan={2}>
									Cost type
								</TableHead>
								<TableHead
									className="px-0 pb-2 pt-0 text-center"
									style={{ width: 50 }}
								>
									Quantity
								</TableHead>
								<TableHead
									className="pb-2 pl-0 pt-0 text-right"
									style={{ width: 85 }}
								>
									Unit
								</TableHead>
								<TableHead
									className="pb-2 pe-5 pl-0 pt-0 text-right"
									style={{ width: 85 }}
								>
									Subtotal
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							<TableRow>
								<TableCell className="pe-2 pl-5" style={{ width: 20 }}>
									<IconBriefcase size={20} className="text-muted-foreground" />
								</TableCell>
								<TableCell className="pl-0">Amount of projects</TableCell>
								<TableCell className="pl-0 text-center">
									{billing.projects.amount}
								</TableCell>
								<TableCell className="pl-0 text-right">
									{billing.projects.unit.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
								<TableCell className="pl-0 pr-5 text-right">
									{billing.projects.price.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="pe-2 pl-5" style={{ width: 20 }}>
									<IconUsers size={20} className="text-muted-foreground" />
								</TableCell>
								<TableCell className="pl-0">Amount of seats</TableCell>
								<TableCell className="pl-0 text-center">
									{billing.seats.amount}
								</TableCell>
								<TableCell className="pl-0 text-right">
									{billing.seats.unit.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
								<TableCell className="pe-5 pl-0 text-right">
									{billing.seats.price.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}{' '}
								</TableCell>
							</TableRow>
						</TableBody>

						<TableFooter>
							<TableRow>
								<TableCell className="p-0" colSpan={3} />
								<TableCell className="pl-0 text-right">Total</TableCell>
								<TableCell className="pl-0 pr-5 text-right">
									{billing.total.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</CardContent>
		</Card>
	)
}
