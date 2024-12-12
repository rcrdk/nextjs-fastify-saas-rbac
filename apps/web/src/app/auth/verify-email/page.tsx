import type { Metadata } from 'next'

import { VerifyEmailForm } from './form'

export const metadata: Metadata = {
	title: 'Verify your e-mail',
}

export default function VerifyEmailPage() {
	return <VerifyEmailForm />
}
