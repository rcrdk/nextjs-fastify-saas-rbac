import { auth } from '@/auth'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { checkEmailChange } from '@/http/account/check-email-change'

import { EmailConfirmationAlert } from './email-confirmation-alert'
import { InformationForm } from './form'

export async function Information() {
	const { user } = await auth()
	const { token } = await checkEmailChange()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Information</CardTitle>
				<CardDescription>
					Update your profile name and e-mail information.
				</CardDescription>
			</CardHeader>

			{token && <EmailConfirmationAlert email={token.payload} />}

			<InformationForm
				disableEmail={!!token}
				initialData={{
					name: user.name,
					email: user.email,
				}}
			/>
		</Card>
	)
}
