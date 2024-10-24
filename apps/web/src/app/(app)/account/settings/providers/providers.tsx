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
		<Card className="flex-wrap items-center justify-between md:flex">
			<CardHeader>
				<CardTitle>Providers</CardTitle>
				<CardDescription>
					Update your account authentication providers.
				</CardDescription>
			</CardHeader>

			<CardContent className="md:p-5">
				<DisconnectGitHubButton disabled={!gitHubProvider || isDisabled} />
			</CardContent>

			<CardContent className="w-full empty:hidden">
				{!user.accounts.length && (
					<div className="rounded border p-4 text-sm text-muted-foreground">
						You don't have any provider linked to your account. You can sign out
						and then sign in with a available provider where your account has
						the email {user.email}
					</div>
				)}

				{gitHubProvider && isDisabled && (
					<div className="rounded border p-4 text-sm text-muted-foreground">
						You cannot disconnect from providers if you dont have a password or
						another provider configured in your account.
					</div>
				)}
			</CardContent>
		</Card>
	)
}
