import type { Metadata } from 'next'

import { ForgotPasswordForm } from './form'

export const metadata: Metadata = {
	title: 'Forgot My Password',
}

export default function ForgotPasswordPage() {
	return <ForgotPasswordForm />
}
