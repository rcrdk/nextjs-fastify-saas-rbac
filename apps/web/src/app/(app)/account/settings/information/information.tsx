import { auth } from '@/auth'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { InformationForm } from './form'

export async function Information() {
	const { user } = await auth()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Information</CardTitle>
				<CardDescription>
					Update your profile name and e-mail information.
				</CardDescription>
			</CardHeader>

			<InformationForm
				initialData={{
					name: user.name,
					email: user.email,
					avatarUrl: user.avatarUrl,
				}}
			/>
		</Card>
	)
}
