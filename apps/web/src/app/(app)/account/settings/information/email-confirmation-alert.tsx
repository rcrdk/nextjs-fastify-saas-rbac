import { IconClock } from '@tabler/icons-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CardContent } from '@/components/ui/card'

import { CancelEmailChangeButton } from './cancel-email-change-button'
import { ConfirmEmailChangeButton } from './confirm-email-change-button'

interface AlertConfirmationProps {
	email: string
}

export function EmailConfirmationAlert({ email }: AlertConfirmationProps) {
	return (
		<CardContent>
			<Alert variant="warning">
				<IconClock size={20} />
				<div className="flex flex-col gap-5 lg:flex-row lg:items-center">
					<div>
						<AlertTitle className="pt-1">Confirm your new e-mail</AlertTitle>
						<AlertDescription className="text-balance">
							Before you effectly change your e-mail to <strong>{email}</strong>{' '}
							you must enter a validation code that was sent to your new e-mail.
							Note: the code is valid for 5 minutes.
						</AlertDescription>
					</div>

					<div className="flex flex-col-reverse justify-end gap-2 sm:flex-row-reverse sm:items-center lg:flex-row">
						<CancelEmailChangeButton />
						<ConfirmEmailChangeButton />
					</div>
				</div>
			</Alert>
		</CardContent>
	)
}
