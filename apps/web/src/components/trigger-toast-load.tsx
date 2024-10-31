'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { generateSlug } from '@/utils/generate-slug'

interface TriggerToastLoadProps {
	message: string
	type: 'success' | 'error'
}

export function TriggerToastLoad({ message, type }: TriggerToastLoadProps) {
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (type === 'success') {
				console.log(type, message)
				toast.success(message, { id: generateSlug(message) })
			}

			if (type === 'error') {
				console.log(type, message)
				toast.error(message, { id: generateSlug(message) })
			}
		}, 0)

		return () => clearTimeout(timeout)
	}, [message, type])

	return <></>
}
