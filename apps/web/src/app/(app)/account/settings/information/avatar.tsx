'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { FormAvatar } from '@/components/form-avatar'
import { useFormState } from '@/hooks/use-form-state'
import { getAvatarUrl } from '@/utils/get-avatar-url'

import { updateAccountAvatarAction } from './actions'

interface AccountAvatarFormProps {
	initialData: {
		userId: string
		email: string
		avatarUrl: string | null
	}
}

export function AccountAvatarForm({ initialData }: AccountAvatarFormProps) {
	const currentAvatar = getAvatarUrl(initialData.avatarUrl, initialData.email)

	const form = useRef<HTMLFormElement>(null)

	const [fileSelected, setFileSelected] = useState<File | null>()

	function onSelectFile(file?: File | null) {
		setFileSelected(file ?? undefined)
	}

	const [{ success, message }, handleAvatar, isPending] = useFormState(
		updateAccountAvatarAction.bind(null, initialData.userId, fileSelected),
		{
			resetStateMessage: true,
			onSuccess() {
				setFileSelected(undefined)
			},
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'update-avatar' })
		}
		if (success && message) {
			toast.success(message, { id: 'update-avatar' })
		}
	}, [success, message, isPending])

	useEffect(() => {
		if (fileSelected && form.current) {
			form.current.requestSubmit()
		}
	}, [fileSelected])

	return (
		<form
			method="POST"
			onSubmit={handleAvatar}
			className="self-center"
			ref={form}
		>
			<FormAvatar
				currentAvatar={currentAvatar}
				loading={isPending}
				receiver="USER"
				onSelectFile={onSelectFile}
			/>
		</form>
	)
}
