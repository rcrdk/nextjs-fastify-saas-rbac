'use client'

import { PopoverContent } from '@radix-ui/react-popover'
import {
	IconCircleCheck,
	IconCircleX,
	IconMailPlus,
	IconThumbDown,
	IconThumbUp,
	IconUserPlus,
} from '@tabler/icons-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { getPendingInvites } from '@/http/invites/get-pending-invites'
import { getRoleName } from '@/utils/get-role-name'
import { timeFromNow, timeFullFormated } from '@/utils/time-formated'

import { Button } from '../ui/button'
import { Popover, PopoverTrigger } from '../ui/popover'
import { Skeleton } from '../ui/skeleton'
import { acceptInviteAction, rejectInviteAction } from './action'

export function PendingInvites() {
	const queryClient = useQueryClient()

	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading } = useQuery({
		queryKey: ['pending-invites'],
		queryFn: getPendingInvites,
		enabled: isOpen,
	})

	async function handleInvite(action: 'accept' | 'reject', inviteId: string) {
		const isAcceped = action === 'accept'

		if (isAcceped) {
			await acceptInviteAction(inviteId)
		} else {
			await rejectInviteAction(inviteId)
		}

		const toastMessage = `You ${isAcceped ? 'accepted' : 'declined'} the invitation to join organization`
		const toastIcon = isAcceped ? (
			<IconThumbUp className="size-7 flex-shrink-0 text-green-500" />
		) : (
			<IconThumbDown className="size-7 flex-shrink-0 text-red-500" />
		)

		toast(toastMessage, {
			id: `invite-acceped-${inviteId}`,
			icon: toastIcon,
			style: { padding: '8px 24px', gap: '12px', maxWidth: '290px' },
		})

		setIsOpen(false)
		queryClient.resetQueries({ queryKey: ['pending-invites'] })
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-9"
					title="Pending invites"
				>
					<IconUserPlus />
					<span className="sr-only">Pending invites</span>
				</Button>
			</PopoverTrigger>

			<PopoverContent
				sideOffset={8}
				collisionPadding={20}
				data-loading={isLoading}
				data-count={data?.invites.length ?? 0}
				className="h-[16.5rem] max-h-[80vh] w-screen max-w-[calc(100vw-40px)] flex-col space-y-4 overflow-auto rounded-lg border bg-white p-4 data-[count=0]:flex data-[loading=true]:overflow-hidden dark:bg-black sm:w-96 sm:max-w-none"
			>
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
							as{' '}
							<span className="font-medium lowercase text-foreground">
								{getRoleName(invite.role)}
							</span>{' '}
							about{' '}
							<span title={timeFullFormated(invite.createdAt)}>
								{timeFromNow(invite.createdAt)}
							</span>
							.
						</p>

						<div className="flex gap-2">
							<Button
								size="xs"
								variant="secondary"
								className="gap-2"
								onClick={() => handleInvite('accept', invite.id)}
							>
								<IconCircleCheck size={16} />
								Accept
							</Button>

							<Button
								size="xs"
								variant="outline"
								className="gap-2"
								onClick={() => handleInvite('reject', invite.id)}
							>
								<IconCircleX size={16} />
								Reject
							</Button>
						</div>
					</div>
				))}

				{data?.invites.length === 0 && (
					<p className="flex flex-grow flex-col items-center justify-center gap-2 text-balance border-t pt-3 text-center text-sm text-muted-foreground">
						<IconMailPlus className="size-16" strokeWidth={1} />
						There are not pending invitations to join organizations for you.
					</p>
				)}

				{isLoading &&
					Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="space-y-2 border-t pt-3">
							<div className="space-y-1">
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-3/5" />
							</div>

							<div className="flex gap-2">
								<Skeleton className="h-6 w-20" />
								<Skeleton className="h-6 w-20" />
							</div>
						</div>
					))}
			</PopoverContent>
		</Popover>
	)
}
