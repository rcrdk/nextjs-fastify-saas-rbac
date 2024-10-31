'use client'

import toast from 'react-hot-toast'

export async function copyTextToClipboard(text: string, toastLabel?: string) {
	try {
		await navigator.clipboard.writeText(text)

		toast.success(
			<span>
				<b className="font-semibold">&quot;{toastLabel ?? text}&quot;</b> was
				copied to your clipboard
			</span>,
		)
	} catch (error) {
		toast.error('Unable to copy to clipboard')
		console.error('Unable to copy to clipboard: ', error)
	}
}
