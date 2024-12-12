import { IconBrandGithub, IconBrandGoogleFilled } from '@tabler/icons-react'

import type { AccountProviders } from '@/@types/account-providers'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { timeFromNow, timeFullFormated } from '@/utils/time-formated'

import { authorizeGithubAction, authorizeGoogleAction } from './actions'
import { DisconnectButton } from './disconnect-button'

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
			case 'GOOGLE':
				return {
					name: 'Google',
					icon: <IconBrandGoogleFilled className="shrink-0" size={24} />,
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

			<CardContent className="flex flex-col gap-2 empty:hidden sm:flex-row sm:flex-wrap">
				{showProviderConnect('GITHUB') && (
					<form action={authorizeGithubAction}>
						<Button type="submit" variant="secondary" className="w-full gap-2">
							<IconBrandGithub size={20} />
							Connect with GitHub
						</Button>
					</form>
				)}

				{showProviderConnect('GOOGLE') && (
					<form action={authorizeGoogleAction}>
						<Button type="submit" variant="secondary" className="w-full gap-2">
							<IconBrandGoogleFilled size={20} />
							Connect with Google
						</Button>
					</form>
				)}
			</CardContent>

			{cannotDisconnect && (
				<CardContent>
					<div className="text-balance rounded border p-4 text-sm text-muted-foreground">
						You cannot disconnect from providers if you don&apos;t have a
						password or another provider configured in your account.
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
							<span
								className="text-xs text-muted-foreground"
								title={timeFullFormated(item.createdAt)}
							>
								Connected {timeFromNow(item.createdAt)}
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
