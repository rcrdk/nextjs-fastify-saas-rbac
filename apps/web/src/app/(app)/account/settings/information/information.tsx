import { auth } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { AccountInformationForm } from './form'

export async function AccountInformation() {
	const { user } = await auth()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Information</CardTitle>
				<CardDescription>Update your profile information.</CardDescription>
			</CardHeader>

			<CardContent>
				<AccountInformationForm
					initialData={{
						name: user.name,
						email: user.email,
					}}
				/>
			</CardContent>
		</Card>
	)
}
