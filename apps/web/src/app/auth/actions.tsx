'use server'

import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
	const githubSignInUrl = new URL('login/oauth/authorize', 'http://github.com')

	githubSignInUrl.searchParams.set('client_id', '')
	githubSignInUrl.searchParams.set('scope', 'user')
	githubSignInUrl.searchParams.set(
		'redirect_uri',
		'http://localhost:3000/api/auth/callback',
	)

	redirect(githubSignInUrl.toString())
}
