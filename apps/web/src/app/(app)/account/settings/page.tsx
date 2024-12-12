import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TriggerToastLoad } from '@/components/trigger-toast-load'

import { Avatar } from './avatar/avatar'
import { DeleteAccount } from './delete-account/delete-account'
import { Information } from './information/information'
import { Organizations } from './organizations/organizations'
import { Password } from './password/password'
import { Providers } from './providers/providers'

export const metadata: Metadata = {
	title: 'Account Settings',
}

export default async function AccountSettingsPage() {
	const cookieStore = await cookies()

	const providerConnectedMessage = cookieStore.get('@SAAS:providerConnected')
	const providerErrorMessage = cookieStore.get('@SAAS:providerError')

	return (
		<div className="flex min-h-svh flex-col px-5 py-3 sm:py-4 md:px-8">
			<Header />

			<main className="mx-auto w-full max-w-[1200px] flex-grow space-y-6 py-6 sm:space-y-8 sm:py-8">
				<h1 className="text-2xl font-bold">Account Settings</h1>

				<div className="space-y-5 md:space-y-8">
					<Avatar />
					<Information />
					<Password />
					<Providers />
					<Organizations />
					<DeleteAccount />
				</div>

				{providerConnectedMessage && (
					<TriggerToastLoad
						message={providerConnectedMessage.value}
						type="success"
					/>
				)}

				{providerErrorMessage && (
					<TriggerToastLoad message={providerErrorMessage.value} type="error" />
				)}
			</main>

			<Footer />
		</div>
	)
}
