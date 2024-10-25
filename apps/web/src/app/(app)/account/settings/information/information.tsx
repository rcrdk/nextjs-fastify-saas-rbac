import { auth } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { AccountAvatarForm } from './avatar'
import { AccountInformationForm } from './form'

export async function AccountInformation() {
	const { user } = await auth()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Information</CardTitle>
				<CardDescription>Update your profile information.</CardDescription>
			</CardHeader>

			<CardContent className="border-t pt-6 md:border-t-0 md:pt-0">
				<div className="gap6 flex flex-col md:flex-row md:items-start md:gap-8">
					<AccountAvatarForm
						initialData={{
							userId: user.id,
							email: user.email,
							avatarUrl: user.avatarUrl,
						}}
					/>

					<AccountInformationForm
						initialData={{
							name: user.name,
							email: user.email,
							avatarUrl: user.avatarUrl,
						}}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
