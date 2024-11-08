'use client'

import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormErrorPassword } from '@/components/form-error-password'
import { FormGrid } from '@/components/form-grid'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter, CardHelp } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { updatePasswordAction } from './actions'

interface PasswordFormProps {
	hasPassword: boolean
}

export function PasswordForm({ hasPassword }: PasswordFormProps) {
	const [showPassword, setShowPassword] = useState(false)

	const [{ success, message, errors }, handleUpdate, isPending] = useFormState(
		updatePasswordAction,
		{
			resetFormOnSuccess: true,
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'update-password' })
		}
		if (success && message) {
			toast.success(message, { id: 'update-password' })
		}
	}, [success, message, isPending])

	return (
		<form onSubmit={handleUpdate} className="flex flex-col space-y-4">
			<CardContent>
				<FormGrid>
					{hasPassword && (
						<>
							<FormGroup>
								<Label>Current password:</Label>
								<Input
									type="password"
									name="current_password"
									id="current_password"
									autoComplete="current-password"
									enterKeyHint="next"
								/>
								<FormError message={errors?.current_password} />
							</FormGroup>

							<div className="hidden sm:block lg:hidden" />
						</>
					)}

					<FormGroup>
						<Label>{hasPassword ? 'New password:' : 'Password:'}</Label>
						<div className="relative">
							<Input
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								autoComplete="new-password"
								enterKeyHint="next"
							/>
							<Button
								type="button"
								size="iconInput"
								variant="ghost"
								title={showPassword ? 'Hide password' : 'Show password'}
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? (
									<IconEyeOff size={20} />
								) : (
									<IconEye size={20} />
								)}
							</Button>
						</div>
						<FormErrorPassword list={errors?.password} />
					</FormGroup>

					<FormGroup>
						<Label>Confirm new password:</Label>
						<Input
							type="password"
							name="password_confirmation"
							id="password_confirmation"
							autoComplete="new-password"
							enterKeyHint="send"
						/>
						<FormError message={errors?.password_confirmation} />
					</FormGroup>
				</FormGrid>
			</CardContent>

			<CardFooter>
				<CardHelp>
					Enter a strong password containing a number, special character, upper
					and lowercase letters.
				</CardHelp>
				<FormSubmitButton loading={isPending}>Save</FormSubmitButton>
			</CardFooter>
		</form>
	)
}
