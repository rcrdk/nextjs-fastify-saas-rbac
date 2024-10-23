/* eslint-disable prettier/prettier */
import { cookies } from 'next/headers'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TriggerToastLoad } from '@/components/trigger-toast-load'

export default async function Home() {
	const cookieStore = await cookies()

	const transferedOrganizationMessage = cookieStore.get('@SAAS:transferedOrganization')
	const deletedOrganizationMessage = cookieStore.get('@SAAS:deletedOrganization')

	return (
		<div className="flex min-h-screen flex-col px-5 py-3 md:px-8 sm:py-4">
			<Header />

			{deletedOrganizationMessage && (
				<TriggerToastLoad
					message={deletedOrganizationMessage.value}
					type="success"
				/>
			)}

			{transferedOrganizationMessage && (
				<TriggerToastLoad
					message={transferedOrganizationMessage.value}
					type="success"
				/>
			)}

			<main className="mx-auto flex w-full max-w-[1200px] flex-grow items-center py-6 sm:py-8">
				<div className="w-full space-y-4">
					<h1 className="text-center text-2xl font-bold">
						Select an organization
					</h1>
				</div>
			</main>

			<Footer />
		</div>
	)
}
