import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const response = NextResponse.next()

	if (pathname.startsWith('/organization')) {
		const slug = pathname.split('/').at(2)
		response.cookies.set('@SAAS:organization', slug!)
	} else {
		response.cookies.delete('@SAAS:organization')
	}

	return response
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
