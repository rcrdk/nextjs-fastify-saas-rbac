import { Metadata } from 'next'

import { ForgotPasswordForm } from './form'

export const metadata: Metadata = {
	title: 'Request New Password',
}

export default function ForgotPasswordPage() {
	return <ForgotPasswordForm />
}
