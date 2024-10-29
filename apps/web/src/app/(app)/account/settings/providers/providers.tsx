import { IconBrandGithub } from '@tabler/icons-react'

import { AccountProviders } from '@/@types/account-providers'
import { auth } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { DisconnectButton } from './disconnect-button'

export async function Providers() {
	const { user } = await auth()

	function setProviderData(provider: AccountProviders) {
		switch (provider) {
			case 'GITHUB':
				return {
					name: 'GitHub',
					icon: <IconBrandGithub className="shrink-0" size={24} />,
				}
		}
	}

	const accounts = user.accounts.map((item) => {
		return {
			...item,
			...setProviderData(item.provider),
		}
	})

	const cannotDisconnect =
		(!user.passwordHash && user.accounts.length === 1) || !user.passwordHash

	return (
		<Card>
			<CardHeader>
				<CardTitle>Third-party Authentication</CardTitle>
				<CardDescription>
					Update your account authentication providers.
				</CardDescription>
			</CardHeader>

			<CardContent className="w-full empty:hidden">
				{!user.accounts.length && (
					<div className="text-balance rounded border p-4 text-sm text-muted-foreground">
						You don't have any third-party authentication connected to your
						account. You can sign out and then sign in with a available provider
						where your account has the email {user.email}
					</div>
				)}

				{cannotDisconnect && (
					<div className="text-balance rounded border p-4 text-sm text-muted-foreground">
						You cannot disconnect from providers if you don't have a password or
						another provider configured in your account.
					</div>
				)}
			</CardContent>

			<CardContent className="p-0">
				{accounts.map((item) => (
					<div
						className="flex items-center gap-3 border-t px-5 py-3 hover:bg-muted/50"
						key={item.id}
					>
						{item.icon}
						<span className="flex-grow font-medium">{item.name}</span>
						<DisconnectButton
							disabled={cannotDisconnect}
							provider={item.provider}
						/>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
