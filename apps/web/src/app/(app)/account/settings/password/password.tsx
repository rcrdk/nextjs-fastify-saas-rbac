import { auth } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { AccountPasswordForm } from './form'

export async function AccountPassword() {
	const { user } = await auth()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>Update your access credentials.</CardDescription>
			</CardHeader>

			<CardContent>
				<AccountPasswordForm hasPassword={user.passwordHash} />
			</CardContent>
		</Card>
	)
}
