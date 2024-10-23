'use client'

import { PopoverContent } from '@radix-ui/react-popover'
import { IconCircleCheck, IconCircleX, IconUserPlus } from '@tabler/icons-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'

import { getPendingInvites } from '@/http/get-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverTrigger } from '../ui/popover'
import { Skeleton } from '../ui/skeleton'
import { acceptInviteAction, rejectInviteAction } from './action'

dayjs.extend(relativeTime)

export function PendingInvites() {
	const queryClient = useQueryClient()

	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading } = useQuery({
		queryKey: ['pending-invites'],
		queryFn: getPendingInvites,
		enabled: isOpen,
	})

	async function handleAcceptInvite(inviteId: string) {
		await acceptInviteAction(inviteId)
		queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
	}

	async function handleRejectInvite(inviteId: string) {
		await rejectInviteAction(inviteId)
		queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="size-9">
					<IconUserPlus />
					<span className="sr-only">Pending invites</span>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-80 space-y-4 rounded border bg-white p-4 dark:bg-black">
				<span className="block text-sm font-medium">
					Pending invites ({data?.invites.length ?? 0})
				</span>

				{data?.invites.map((invite) => (
					<div key={invite.id} className="space-y-2 border-t pt-2">
						<p className="text-balance text-sm leading-relaxed text-muted-foreground">
							<span className="font-medium text-foreground">
								{invite.author?.name ?? 'Someone'}
							</span>{' '}
							invited you to join{' '}
							<span className="font-medium text-foreground">
								{invite.organization.name}
							</span>{' '}
							about {dayjs(invite.createdAt).fromNow()}.
						</p>

						<div className="flex gap-2">
							<Button
								size="xs"
								variant="secondary"
								className="gap-2"
								onClick={() => handleAcceptInvite(invite.id)}
							>
								<IconCircleCheck size={16} />
								Accept
							</Button>

							<Button
								size="xs"
								variant="outline"
								className="gap-2"
								onClick={() => handleRejectInvite(invite.id)}
							>
								<IconCircleX size={16} />
								Reject
							</Button>
						</div>
					</div>
				))}

				{data?.invites.length === 0 && (
					<p className="border-t pt-3 text-sm text-muted-foreground">
						There are not pending invitations for you.
					</p>
				)}

				{isLoading && (
					<div className="space-y-2 border-t pt-2">
						<div className="space-y-1">
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-3/5" />
						</div>

						<div className="flex gap-2">
							<Skeleton className="h-6 w-20" />
							<Skeleton className="h-6 w-20" />
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	)
}
