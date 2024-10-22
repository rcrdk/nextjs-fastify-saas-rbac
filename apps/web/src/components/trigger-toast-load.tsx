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
		if (type === 'success') {
			toast.success(message, { id: generateSlug(message) })
		}

		if (type === 'error') {
			toast.error(message, { id: generateSlug(message) })
		}
	}, [])

	return null
}
