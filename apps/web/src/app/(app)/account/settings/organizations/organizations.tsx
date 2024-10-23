import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getOrganizations } from '@/http/get-organizations'

export async function AccountOrganizations() {
	const { organizations } = await getOrganizations()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Organizations</CardTitle>
				<CardDescription>
					Manage your organization and organizations that you are in.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<p>List of organizations that are in:</p>
				<p>
					AVatar, name, role, actions: leave (if not owner), access organization
				</p>
				<br />
				<pre>{JSON.stringify(organizations, null, 2)}</pre>
			</CardContent>
		</Card>
	)
}
