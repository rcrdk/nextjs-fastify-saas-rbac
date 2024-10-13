/* eslint-disable prettier/prettier */
'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
	const githubSignInUrl = new URL('login/oauth/authorize', 'http://github.com')

	githubSignInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
	githubSignInUrl.searchParams.set('scope', 'user')
	githubSignInUrl.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)

	redirect(githubSignInUrl.toString())
}
