import { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

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
					<Card>
						<CardHeader>
							<CardTitle>Information</CardTitle>
							<CardDescription>
								Lorem ipsum dolor sit amet consectur.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<p>
								Avatar, Name, Email (validate unique, needs verification again?)
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>
								Lorem ipsum dolor sit amet consectur.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<p>Current password, new password, confirm new password</p>
							<p>What to do if was logged with social?</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Organizations</CardTitle>
							<CardDescription>
								Lorem ipsum dolor sit amet consectur.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<p>List of organizations that are in:</p>
							<p>
								AVatar, name, role, actions: leave (if not owner), access
								organization
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Delete account</CardTitle>
							<CardDescription>
								leaving organizations that are in and organizations that owns
								will be deleted
							</CardDescription>
						</CardHeader>

						<CardContent>
							<p>Same as shutdown organization</p>
						</CardContent>
					</Card>
				</div>
			</main>

			<Footer />
		</div>
	)
}
