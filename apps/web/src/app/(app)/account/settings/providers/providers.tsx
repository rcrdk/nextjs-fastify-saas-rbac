import { IconBrandGithub } from '@tabler/icons-react'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export async function AccountProviders() {
	const { user } = await auth()

	// eslint-disable-next-line prettier/prettier
	const gitHubProvider = user.accounts.find((item) => item.provider === 'GITHUB')

	return (
		<Card>
			<CardHeader>
				<CardTitle>Providers</CardTitle>
				<CardDescription>
					Update your account authentication providers.
				</CardDescription>
			</CardHeader>

			<CardContent>
				{!user.accounts.length && (
					<div className="rounded border p-4 text-sm text-muted-foreground">
						You don't have any provider linked to your account. You can sign out
						and then sign in with a available provider where your account has
						the email {user.email}
					</div>
				)}

				{!!user.accounts.length && !user.passwordHash && (
					<div className="mb-4 rounded border p-4 text-sm text-muted-foreground">
						You cannot disconnect from providers if you dont have a password
						configured in your account.
					</div>
				)}

				{gitHubProvider && (
					<Button
						variant="secondary"
						disabled={!user.passwordHash}
						className="gap-2"
					>
						<IconBrandGithub size={20} />
						Disconnect from GitHub
					</Button>
				)}
			</CardContent>
		</Card>
	)
}
