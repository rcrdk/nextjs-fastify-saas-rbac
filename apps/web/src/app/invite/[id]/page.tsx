import {
	IconCircleCheck,
	IconCircleX,
	IconHome,
	IconLogin,
	IconLogout,
	IconUser,
} from '@tabler/icons-react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInvite } from '@/http/invites/accept-invite'
import { getInvite } from '@/http/invites/get-invite'
import { getAvatarUrl } from '@/utils/get-avatar-url'
import { timeFromNow, timeFullFormated } from '@/utils/time-formated'

type Params = Promise<{ id: string }>

export const metadata: Metadata = {
	title: 'Accept Invite',
}

export default async function InvitePage({ params }: { params: Params }) {
	const { id: inviteId } = await params

	const { invite } = await getInvite({ inviteId })

	const isUserAuthenticated = await isAuthenticated()

	let currentUserEmail = null

	if (isUserAuthenticated) {
		const { user } = await auth()
		currentUserEmail = user.email
	}

	const isUserAuthenticatedWithInviteEmail = currentUserEmail === invite.email

	async function signInFromInvite() {
		'use server'

		const cookieStore = await cookies()

		cookieStore.set('@SAAS:inviteId', inviteId)

		redirect(`/auth/sign-in?email=${invite.email}`)
	}

	async function acceptInviteAction() {
		'use server'

		await acceptInvite({ inviteId })

		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
			<div className="flex w-full max-w-sm flex-col space-y-6">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="size-16">
						<AvatarImage
							src={getAvatarUrl(invite.author?.avatarUrl, invite.author?.email)}
						/>
						<AvatarFallback className="text-md font-medium">
							<IconUser size={32} className="text-muted-foreground/50" />
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
						about{' '}
						<span title={timeFullFormated(invite.createdAt)}>
							{timeFromNow(invite.createdAt)}
						</span>
						:
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
					<div className="space-y-2">
						<form action={acceptInviteAction}>
							<Button type="submit" className="w-full gap-2">
								<IconCircleCheck size={20} />
								Join {invite.organization.name}
							</Button>
						</form>

						<Button variant="outline" className="w-full gap-2" asChild>
							<Link href={`/invite/${inviteId}/decline`}>
								<IconCircleX size={20} />I want to decline the invite
							</Link>
						</Button>
					</div>
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
