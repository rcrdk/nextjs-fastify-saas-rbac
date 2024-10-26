'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { FormAvatar } from '@/components/form-avatar'
import { useFormState } from '@/hooks/use-form-state'
import { getAvatarUrl } from '@/utils/get-avatar-url'

import { updateAvatarAction } from './actions'

interface AvatarFormProps {
	initialData: {
		organizationId: string
		avatarUrl: string | null
	}
}

export function AvatarForm({ initialData }: AvatarFormProps) {
	const form = useRef<HTMLFormElement>(null)

	const [fileSelected, setFileSelected] = useState<File | null>()

	function onSelectFile(file?: File | null) {
		setFileSelected(file ?? undefined)
	}

	const [{ success, message }, handleAvatar, isPending] = useFormState(
		updateAvatarAction.bind(null, initialData.organizationId, fileSelected),
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
				currentAvatar={getAvatarUrl(initialData.avatarUrl)}
				loading={isPending}
				receiver="ORGANIZATION"
				onSelectFile={onSelectFile}
			/>
		</form>
	)
}
