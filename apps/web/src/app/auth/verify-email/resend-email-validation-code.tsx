'use client'

import { IconCircleCheck, IconCircleX, IconLoader2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useFormState } from '@/hooks/use-form-state'

import { resendEmailValidationCodeAction } from './actions'

interface ResendEmailValidationCodeProps {
	email: string
}

export function ResendEmailValidationCode({
	email,
}: ResendEmailValidationCodeProps) {
	const [retry, setRetry] = useState(true)

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		resendEmailValidationCodeAction,
	)

	useEffect(() => {
		if (errors || success || (!success && message)) {
			setRetry(false)
		}
	}, [errors, isPending, message, success])

	return (
		<form onSubmit={handleSubmit}>
			<input type="hidden" name="email" value={email} />

			{retry && (
				<Button
					type="submit"
					className="group w-full gap-2"
					variant="link"
					size="sm"
					disabled={isPending}
				>
					{isPending && (
						<>
							<IconLoader2 size={20} className="animate-spin duration-1000" />
							Sending validation code e-mail...
						</>
					)}

					{!isPending && 'Resend validation code'}
				</Button>
			)}

			{!retry && (
				<Button
					type="submit"
					className="group w-full gap-1 hover:no-underline"
					variant="link"
					size="sm"
					disabled={isPending}
				>
					{!isPending && success && (
						<>
							<IconCircleCheck className="text-green-500" size={20} />
							<span className="text-green-500">An e-mail was sent</span>
							<span className="group-hover:underline">(try again)</span>
						</>
					)}

					{!isPending && !!errors && (
						<>
							<IconCircleX className="text-red-500" size={20} />
							<span className="text-red-500">Enter a valid email</span>
							<span className="group-hover:underline">(send again)</span>
						</>
					)}

					{!isPending && !success && message && !errors && (
						<>
							<IconCircleX className="text-red-500" size={20} />
							<span className="text-red-500">An error occoured</span>
							<span className="group-hover:underline">(send again)</span>
						</>
					)}

					{isPending && (
						<>
							<IconLoader2 size={20} className="animate-spin duration-1000" />
							Sending validation code e-mail...
						</>
					)}
				</Button>
			)}
		</form>
	)
}
