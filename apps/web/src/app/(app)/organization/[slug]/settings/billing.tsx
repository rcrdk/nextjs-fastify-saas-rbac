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
import { getOrganizationBilling } from '@/http/get-billing'

export async function Billing() {
	const currentOrganization = getCurrentOrganization()

	const { billing } = await getOrganizationBilling({
		organization: currentOrganization!,
	})

	return (
		<Card className="lg:only:col-span-2">
			<CardHeader>
				<CardTitle>Billing</CardTitle>
				<CardDescription>
					Information about your organizations costs.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="overflow-hidden rounded-sm border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Cost type</TableHead>
								<TableHead className="text-right" style={{ width: 100 }}>
									Quantity
								</TableHead>
								<TableHead className="text-right" style={{ width: 100 }}>
									Unit
								</TableHead>
								<TableHead className="text-right" style={{ width: 100 }}>
									Subtotal
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							<TableRow>
								<TableCell>Amount of projects</TableCell>
								<TableCell className="text-right">
									{billing.projects.amount}
								</TableCell>
								<TableCell className="text-right">
									{billing.projects.unit.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
								<TableCell className="text-right">
									{billing.projects.price.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell>Amount of seats</TableCell>
								<TableCell className="text-right">
									{billing.seats.amount}
								</TableCell>
								<TableCell className="text-right">
									{billing.seats.unit.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
								<TableCell className="text-right">
									{billing.seats.price.toLocaleString('en-us', {
										style: 'currency',
										currency: 'USD',
									})}{' '}
								</TableCell>
							</TableRow>
						</TableBody>

						<TableFooter>
							<TableRow>
								<TableCell />
								<TableCell />
								<TableCell className="text-right">Total</TableCell>
								<TableCell className="text-right">
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
