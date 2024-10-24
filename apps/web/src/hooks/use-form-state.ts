import { FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
	success: boolean
	message: string | null
	errors: Record<string, string[]> | null
}

/**
 *
 * @param action Set a action for the form
 * @param options
 * @returns
 */
export function useFormState(
	action: (data: FormData) => Promise<FormState>,
	options?: {
		initialState?: FormState
		onSuccess?: () => Promise<void> | void
		resetFormOnSuccess?: boolean
		resetStateMessage?: boolean
	},
) {
	const [isPending, startTransition] = useTransition()

	const [formState, setFormState] = useState(
		options?.initialState ?? { success: false, message: null, errors: null },
	)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const form = event.currentTarget
		const data = new FormData(form)

		startTransition(async () => {
			const state = await action(data)

			if (!!state.success && options?.onSuccess) {
				await options.onSuccess()
			}

			if (!!state.success && options?.resetFormOnSuccess) {
				requestFormReset(form)
			}

			setFormState(state)

			if (options?.resetStateMessage) {
				setTimeout(() => {
					setFormState((prev) => {
						return {
							...prev,
							message: null,
						}
					})
				}, 500)
			}
		})
	}

	return [formState, handleSubmit, isPending] as const
}
