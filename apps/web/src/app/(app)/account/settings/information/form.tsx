'use client'

import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormGrid } from '@/components/form-grid'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { CardContent, CardFooter, CardHelp } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { saveInformationsAction } from './actions'

interface InformationFormProps {
	disableEmail: boolean
	initialData: {
		name: string | null
		email: string
	}
}

export function InformationForm({
	disableEmail,
	initialData,
}: InformationFormProps) {
	const form = useRef<HTMLFormElement>(null)

	const [{ success, message, errors }, handleUpdate, isPending] = useFormState(
		saveInformationsAction,
		{
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (form.current) {
			form.current.reset()
		}
	}, [form, disableEmail])

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'save-account' })
		}
		if (success && message) {
			toast.success(message, { id: 'save-account' })
		}
	}, [success, message, isPending])

	return (
		<form onSubmit={handleUpdate} ref={form}>
			<CardContent>
				<FormGrid>
					<FormGroup>
						<Label>Full name:</Label>
						<Input
							name="name"
							id="name"
							type="text"
							defaultValue={initialData.name ?? undefined}
							enterKeyHint="next"
						/>
						<FormError message={errors?.name} />
					</FormGroup>

					<FormGroup>
						<Label>E-mail:</Label>
						<Input
							name="email"
							id="email"
							type="email"
							autoComplete="email"
							readOnly={disableEmail}
							defaultValue={initialData.email}
							enterKeyHint="send"
						/>
						<FormError message={errors?.email} />
					</FormGroup>
				</FormGrid>
			</CardContent>

			<CardFooter>
				<CardHelp>
					Changing your e-mail, requires that you validate it again.
				</CardHelp>

				<FormSubmitButton size="sm" loading={isPending}>
					Save
				</FormSubmitButton>
			</CardFooter>
		</form>
	)
}
