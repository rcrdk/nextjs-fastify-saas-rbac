import { Metadata } from 'next'

import { SignUpForm } from './form'

export const metadata: Metadata = {
	title: 'Sign up',
}

export default function SignUpPage() {
	return <SignUpForm />
}
