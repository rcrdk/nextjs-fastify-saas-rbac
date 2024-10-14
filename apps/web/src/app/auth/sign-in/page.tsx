import { Metadata } from 'next'

import { SignInForm } from './form'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default function SignInPage() {
	return <SignInForm />
}
