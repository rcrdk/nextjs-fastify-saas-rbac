'use client'

import {
	IconBriefcase,
	IconBuilding,
	IconLoader2,
	IconUpload,
	IconUser,
} from '@tabler/icons-react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

import type { AvatarReceipient } from '@/@types/avatar-receipient'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface FormAvatarProps {
	currentAvatar?: string | null
	receiver: AvatarReceipient
	loading: boolean
	onSelectFile: (file?: File | null) => void
	className?: string
}

export function FormAvatar({
	currentAvatar,
	receiver,
	loading,
	onSelectFile,
	className,
}: FormAvatarProps) {
	const [preview, setPreview] = useState<string>()

	function renderFallbackIcon() {
		switch (receiver) {
			case 'USER':
				return <IconUser className="size-2/3 opacity-50" strokeWidth={1} />
			case 'ORGANIZATION':
				return <IconBuilding className="size-2/3 opacity-50" strokeWidth={1} />
			case 'PROJECT':
				return <IconBriefcase className="size-2/3 opacity-50" strokeWidth={1} />
		}
	}

	async function handleAvatarPreview(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target?.files?.length ? event.target?.files[0] : null

		onSelectFile(file)

		if (!file) {
			setPreview(undefined)
		}

		if (file) {
			const image = URL.createObjectURL(file)
			setPreview(image)
		}
	}

	return (
		<div className="group relative">
			<Avatar className={`z-0 size-24 sm:size-20 ${className ?? ''}`}>
				<AvatarImage
					src={preview || currentAvatar || undefined}
					className="object-cover object-center"
				/>
				<AvatarFallback>{renderFallbackIcon()}</AvatarFallback>

				{loading && (
					<div className="absolute inset-0 z-[2] flex items-center justify-center rounded-full bg-muted">
						<IconLoader2
							size={20}
							strokeWidth={1}
							className="size-2/5 animate-spin opacity-50 duration-1000"
						/>
					</div>
				)}

				{!loading && (
					<div className="absolute inset-0 z-[1] flex select-none flex-col items-center justify-center gap-1 text-balance rounded-full bg-muted/50 text-center text-xs font-medium leading-none opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
						<IconUpload size={16} />
						{preview || currentAvatar ? 'Change avatar' : 'Send avatar'}
					</div>
				)}
			</Avatar>

			<input
				type="file"
				name="file"
				id="file"
				className="z-3 absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-wait"
				accept="image/jpeg,image/png"
				title=""
				disabled={loading}
				onChange={(e) => handleAvatarPreview(e)}
			/>
		</div>
	)
}
