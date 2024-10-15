import { ability, getCurrentOrganization } from '@/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
	const organization = getCurrentOrganization()

	const permissions = await ability()

	const canUpdateOrganization = permissions?.can('update', 'Organization')
	const canGetBilling = permissions?.can('get', 'Billing')
	const canGetMembers = permissions?.can('get', 'User')
	const canGetProjects = permissions?.can('get', 'Project')

	return (
		<div>
			<nav className="mx-auto flex w-full max-w-[1200px] gap-1 border-b py-4">
				{canGetProjects && (
					<Button
						variant="ghost"
						size="sm"
						className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
						asChild
					>
						<NavLink href={`/organization/${organization}`}>Projects</NavLink>
					</Button>
				)}

				{canGetMembers && (
					<Button
						variant="ghost"
						size="sm"
						className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
						asChild
					>
						<NavLink href={`/organization/${organization}/members`}>
							Members
						</NavLink>
					</Button>
				)}

				{(canUpdateOrganization || canGetBilling) && (
					<Button
						variant="ghost"
						size="sm"
						className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
						asChild
					>
						<NavLink href={`/organization/${organization}/settings`}>
							Settings and Billing
						</NavLink>
					</Button>
				)}
			</nav>
		</div>
	)
}
