import { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import { AccountDelete } from './delete-account/delete-account'
import { AccountInformation } from './information/information'
import { AccountOrganizations } from './organizations/organizations'
import { AccountPassword } from './password/password'
import { AccountProviders } from './providers/providers'

export const metadata: Metadata = {
	title: 'Account Settings',
}

export default function AccountSettingsPage() {
	return (
		<div className="flex min-h-screen flex-col px-5 py-3 sm:py-4 md:px-8">
			<Header />

			<main className="mx-auto w-full max-w-[1200px] flex-grow space-y-6 py-6 sm:space-y-8 sm:py-8">
				<h1 className="text-2xl font-bold">Account Settings</h1>

				<div className="space-y-5 md:space-y-8">
					<AccountInformation />
					<AccountPassword />
					<AccountProviders />
					<AccountOrganizations />
					<AccountDelete />
				</div>
			</main>

			<Footer />
		</div>
	)
}
