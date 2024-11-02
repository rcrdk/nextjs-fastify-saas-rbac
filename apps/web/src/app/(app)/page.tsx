import { cookies } from 'next/headers'

import { auth } from '@/auth'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TriggerToastLoad } from '@/components/trigger-toast-load'
import { getFirstName } from '@/utils/get-first-name'

export default async function Home() {
	const cookieStore = await cookies()
	const { user } = await auth()

	const transferedOrganizationMessage = cookieStore.get(
		'@SAAS:transferedOrganization',
	)
	const deletedOrganizationMessage = cookieStore.get(
		'@SAAS:deletedOrganization',
	)

	return (
		<div className="flex min-h-screen flex-col px-5 py-3 sm:py-4 md:px-8">
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
				<div className="w-full space-y-4 text-center">
					<h1 className="text-4xl font-bold">
						Hello, {getFirstName(user.name, 'human')}!
					</h1>
					<p className="text-balance text-muted-foreground">
						It is nice to have you here. To get it started you can select
						organization on the navigation menu above.
					</p>
				</div>
			</main>

			<Footer />
		</div>
	)
}
