import type { Metadata } from 'next'

import { RecoverPasswordForm } from './form'

export const metadata: Metadata = {
	title: 'Create New Password',
}

export default function RecoverPasswordPage() {
	return <RecoverPasswordForm />
}
