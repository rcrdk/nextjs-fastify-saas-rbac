import { getCurrentOrganization } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/organizations/get-organization'

import { AvatarForm } from './form'

export async function Avatar() {
	const currentOrganization = await getCurrentOrganization()

	const { organization } = await getOrganization({
		organizationSlug: currentOrganization!,
	})

	return (
		<Card className="flex">
			<CardHeader className="flex-grow">
				<CardTitle>Avatar</CardTitle>
				<CardDescription className="text-balance">
					This is the organization avatar. An avatar is optional but strongly
					recommended.
				</CardDescription>
			</CardHeader>

			<CardContent className="p-5 pl-0 md:pl-5 md:pr-8">
				<AvatarForm
					initialData={{
						organizationId: organization.id,
						avatarUrl: organization.avatarUrl,
					}}
				/>
			</CardContent>
		</Card>
	)
}
