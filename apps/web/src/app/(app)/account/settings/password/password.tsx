import { auth } from '@/auth'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { PasswordForm } from './form'

export async function Password() {
	const { user } = await auth()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					{!user.passwordHash
						? 'You previously signed in using a third-party service, you can set a password for your account.'
						: 'Change your authentication password.'}
				</CardDescription>
			</CardHeader>

			<PasswordForm hasPassword={user.passwordHash} />
		</Card>
	)
}
