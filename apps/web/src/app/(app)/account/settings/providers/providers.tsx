import { auth } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { DisconnectGitHubButton } from './disconnect-github-button'

export async function AccountProviders() {
	const { user } = await auth()

	const gitHubProvider = user.accounts.find(
		(item) => item.provider === 'GITHUB',
	)

	const isDisabled =
		(!user.passwordHash && user.accounts.length === 1) || !user.passwordHash

	return (
		<Card
			className={gitHubProvider ? 'items-center justify-between md:flex' : ''}
		>
			<CardHeader>
				<CardTitle>Providers</CardTitle>
				<CardDescription>
					Update your account authentication providers.
				</CardDescription>
			</CardHeader>

			<CardContent className={gitHubProvider ? 'md:p-5' : ''}>
				{!user.accounts.length && (
					<div className="rounded border p-4 text-sm text-muted-foreground">
						You don't have any provider linked to your account. You can sign out
						and then sign in with a available provider where your account has
						the email {user.email}
					</div>
				)}

				{isDisabled && (
					<div className="mb-4 rounded border p-4 text-sm text-muted-foreground">
						You cannot disconnect from providers if you dont have a password
						configured in your account.
					</div>
				)}

				{gitHubProvider && <DisconnectGitHubButton disabled={isDisabled} />}
			</CardContent>
		</Card>
	)
}
