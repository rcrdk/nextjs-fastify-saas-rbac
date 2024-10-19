import { IconCircleCheck, IconCircleX, IconUser } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'
import { rejectInvite } from '@/http/reject-invite'
import { getAvatarUrl } from '@/utils/get-avatar-url'

dayjs.extend(relativeTime)

interface RejectInvitePageProps {
	params: {
		id: string
	}
}

// METADARA

export default async function RejectInvitePage({
	params,
}: RejectInvitePageProps) {
	const inviteId = params.id

	const { invite } = await getInvite({ inviteId })

	async function rejectInviteAction() {
		'use server'

		await rejectInvite({ inviteId })

		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
			<div className="flex w-full max-w-sm flex-col space-y-6">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="size-16">
						{invite.author && (
							<AvatarImage
								src={getAvatarUrl(invite.author.avatarUrl, invite.author.email)}
							/>
						)}
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
						about {dayjs(invite.createdAt).fromNow()}:
					</p>
				</div>

				<Separator />

				<div className="space-y-2">
					<form action={rejectInviteAction}>
						<Button
							type="submit"
							variant="destructive"
							className="w-full gap-2"
						>
							<IconCircleX size={20} />
							Decline invite
						</Button>
					</form>

					<Button variant="outline" className="w-full gap-2" asChild>
						<Link href={`/invite/${inviteId}`}>
							<IconCircleCheck size={20} />I want to accept the invite
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
