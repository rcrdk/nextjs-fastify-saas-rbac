import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const redirectURL = request.nextUrl.clone()
	redirectURL.pathname = '/auth/sign-in'

	cookies().delete('@SAAS:token')

	return NextResponse.redirect(redirectURL)
}
