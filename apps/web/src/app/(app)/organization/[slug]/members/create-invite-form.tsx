'use client'

import {
	IconExclamationCircle,
	IconSend,
	IconSettings,
} from '@tabler/icons-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		createInviteAction,
		() => {},
		undefined,
		true,
	)

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			{!success && message && (
				<Alert variant="destructive">
					<IconExclamationCircle size={20} />
					<AlertTitle>Send invite has failed:</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			)}

			<div className="flex items-start gap-4">
				<div className="flex-grow space-y-1">
					<Input
						name="email"
						type="email"
						id="email"
						placeholder="Invite member by e-mail"
					/>
					{errors?.email && (
						<p className="text-xs text-red-500 dark:text-red-400">
							{errors.email.at(0)}
						</p>
					)}
				</div>

				<div className="flex-grow space-y-1">
					<Select name="role" defaultValue="MEMBER">
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="MEMBER">Member</SelectItem>
							<SelectItem value="BILLING">Billing</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button
					type="submit"
					disabled={isPending}
					className="min-w-48 flex-shrink-0 gap-2"
				>
					{isPending ? (
						<>
							<IconSettings size={20} className="animate-spin duration-2000" />
							Sending invite...
						</>
					) : (
						<>
							<IconSend size={20} />
							Send invite
						</>
					)}
				</Button>
			</div>
		</form>
	)
}
