/* eslint-disable prettier/prettier */
'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGitHubAction() {
	const githubSignInUrl = new URL('login/oauth/authorize', 'http://github.com')

	githubSignInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
	githubSignInUrl.searchParams.set('scope', 'user')
	githubSignInUrl.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)

	redirect(githubSignInUrl.toString())
}


export async function signInWithGoogleAction() {
	const googleSignInUrl = new URL('o/oauth2/v2/auth', 'https://accounts.google.com')

	googleSignInUrl.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
	googleSignInUrl.searchParams.set('redirect_uri', env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI)
	googleSignInUrl.searchParams.set('response_type', env.GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE)
	googleSignInUrl.searchParams.set('scope', env.GOOGLE_OAUTH_CLIENT_SCOPE)
	googleSignInUrl.searchParams.set('prompt', 'consent')
	googleSignInUrl.searchParams.set('access_type', 'offline')

	redirect(googleSignInUrl.toString())
}
