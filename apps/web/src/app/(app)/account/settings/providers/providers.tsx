import { IconBrandGithub } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { AccountProviders } from '@/@types/account-providers'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { authorizeGithubAction } from './actions'
import { DisconnectButton } from './disconnect-button'

dayjs.extend(relativeTime)

export async function Providers() {
	const { user } = await auth()

	const accounts = user.accounts.map((item) => {
		return {
			...item,
			...setProviderData(item.provider),
		}
	})

	function setProviderData(provider: AccountProviders) {
		switch (provider) {
			case 'GITHUB':
				return {
					name: 'GitHub',
					icon: <IconBrandGithub className="shrink-0" size={24} />,
				}
		}
	}

	function showProviderConnect(provider: AccountProviders) {
		return !accounts.find((item) => item.provider === provider)
	}

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

			<CardContent className="empty:hidden">
				{showProviderConnect('GITHUB') && (
					<form action={authorizeGithubAction}>
						<Button type="submit" variant="outline" className="gap-2">
							<IconBrandGithub size={20} />
							GitHub
						</Button>
					</form>
				)}
			</CardContent>

			{cannotDisconnect && (
				<CardContent>
					<div className="text-balance rounded border p-4 text-sm text-muted-foreground">
						You cannot disconnect from providers if you don't have a password or
						another provider configured in your account.
					</div>
				</CardContent>
			)}

			<CardContent className="p-0">
				{accounts.map((item) => (
					<div
						className="flex items-center gap-3 border-t px-5 py-3 hover:bg-muted/50"
						key={item.provider}
					>
						{item.icon}
						<div className="flex flex-grow flex-col">
							<span className="font-medium">{item.name}</span>
							<span className="text-xs text-muted-foreground">
								Connected {dayjs(item.createdAt).fromNow()}
							</span>
						</div>
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
