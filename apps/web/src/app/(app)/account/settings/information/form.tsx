'use client'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AccountInformationFormProps {
	initialData: {
		name: string | null
		email: string
	}
}

export function AccountInformationForm({
	initialData,
}: AccountInformationFormProps) {
	return (
		<form className="flex flex-col space-y-4">
			<div className="space-y-1">
				<Label>Name:</Label>
				<Input
					name="name"
					type="text"
					defaultValue={initialData.name ?? undefined}
				/>
				{/* <FormError message={errors?.name} /> */}
			</div>

			<div className="space-y-1">
				<Label>E-mail:</Label>
				<Input name="email" type="email" defaultValue={initialData.email} />
				{/* <FormError message={errors?.email} /> */}
			</div>

			<FormSubmitButton
				className="sm:min-w-80 sm:self-center"
				loading={false}
				loadingLabel="Updating profile..."
			>
				Update profile
			</FormSubmitButton>
		</form>
	)
}
