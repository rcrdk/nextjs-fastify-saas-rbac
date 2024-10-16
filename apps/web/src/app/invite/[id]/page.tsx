import {
	IconCircleCheck,
	IconHome,
	IconLogin,
	IconLogout,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInvite } from '@/http/accept-invite'
import { getInvite } from '@/http/get-invite'
import { getInitials } from '@/utils/get-initials'

dayjs.extend(relativeTime)

interface InvitePageProps {
	params: {
		id: string
	}
}

export default async function InvitePage({ params }: InvitePageProps) {
	const inviteId = params.id

	const { invite } = await getInvite(inviteId)

	const isUserAuthenticated = isAuthenticated()

	let currentUserEmail = null

	if (isUserAuthenticated) {
		const { user } = await auth()
		currentUserEmail = user.email
	}

	const isUserAuthenticatedWithInviteEmail = currentUserEmail === invite.email

	async function signInFromInvite() {
		'use server'

		cookies().set('@SAAS:inviteId', inviteId)

		redirect(`/auth/sign-in?email=${invite.email}`)
	}

	async function acceptInviteAction() {
		'use server'

		await acceptInvite(inviteId)

		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
			<div className="flex w-full max-w-sm flex-col space-y-6">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="size-16">
						{invite.author?.avatarUrl && (
							<AvatarImage src={invite.author.avatarUrl} />
						)}
						<AvatarFallback className="text-md font-medium">
							{getInitials(invite.author?.name ?? 'My Account')}
						</AvatarFallback>
					</Avatar>

					<p className="text-balance text-center leading-relaxed text-muted-foreground">
						<span className="font-medium text-foreground">
							{invite.author?.name ?? 'Someone'}
						</span>{' '}
						invited you to join{' '}
						<span className="font-medium text-foreground">
							{invite.organization.name}
						</span>{' '}
						about {dayjs(invite.createdAt).fromNow()}:
					</p>
				</div>

				<Separator />

				{!isUserAuthenticated && (
					<form action={signInFromInvite}>
						<Button type="submit" variant="secondary" className="w-full gap-2">
							<IconLogin size={20} />
							Sign-in to accept the invite
						</Button>
					</form>
				)}

				{isUserAuthenticatedWithInviteEmail && (
					<form action={acceptInviteAction}>
						<Button type="submit" variant="secondary" className="w-full gap-2">
							<IconCircleCheck size={20} />
							Join {invite.organization.name}
						</Button>
					</form>
				)}

				{isUserAuthenticated && !isUserAuthenticatedWithInviteEmail && (
					<div className="space-y-4">
						<p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
							This invite was sent to{' '}
							<span className="font-medium text-foreground">
								{invite.email}
							</span>
							, but you are authenticated already with{' '}
							<span className="font-medium text-foreground">
								{currentUserEmail}
							</span>
							.
						</p>

						<div className="space-y-2">
							<Button variant="secondary" className="w-full gap-2" asChild>
								<a href="/api/auth/sign-out">
									<IconLogout size={20} />
									Sign out from current account
								</a>
							</Button>

							<Button variant="outline" className="w-full gap-2" asChild>
								<Link href="/">
									<IconHome size={20} />
									Return to dashboard
								</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
