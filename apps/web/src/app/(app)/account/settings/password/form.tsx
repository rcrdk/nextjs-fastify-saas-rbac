'use client'

import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useState } from 'react'

import { FormError } from '@/components/form-error'
import { FormErrorPassword } from '@/components/form-error-password'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AccountPasswordFormProps {
	hasPassword: boolean
}

export function AccountPasswordForm({ hasPassword }: AccountPasswordFormProps) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<form className="flex flex-col space-y-4">
			{!hasPassword && (
				<div className="rounded border p-4 text-sm text-muted-foreground">
					You signed in using a provider, you can set a password for your
					account.
				</div>
			)}

			<div
				className={`grid auto-cols-auto grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 ${hasPassword ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}
			>
				{hasPassword && (
					<div className="space-y-1 sm:col-span-2 lg:col-span-1">
						<Label>Current password:</Label>
						<Input
							type="password"
							name="current_password"
							id="current_password"
							autoComplete="off"
						/>
						{/* <FormError message={errors?.current_password} /> */}
					</div>
				)}

				<div className="space-y-1">
					<Label>{hasPassword ? 'New password:' : 'Password:'}</Label>
					<div className="relative">
						<Input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							autoComplete="off"
						/>
						<Button
							type="button"
							size="iconInput"
							variant="ghost"
							title={showPassword ? 'Hide password' : 'Show password'}
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
						</Button>
					</div>
					{/* <FormErrorPassword list={errors?.password} /> */}
				</div>

				<div className="space-y-1">
					<Label>Confirm new password:</Label>
					<Input
						type="password"
						name="password_confirmation"
						id="password_confirmation"
						autoComplete="off"
					/>
					{/* <FormError message={errors?.password_confirmation} /> */}
				</div>
			</div>

			<FormSubmitButton
				className="sm:min-w-80 sm:self-center"
				loading={false}
				loadingLabel="Updating password..."
				variant="secondary"
			>
				Change password
			</FormSubmitButton>
		</form>
	)
}
