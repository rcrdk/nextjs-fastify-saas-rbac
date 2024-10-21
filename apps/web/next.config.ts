import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'github.com' },
			{ hostname: 'avatars.githubusercontent.com' },
			{ hostname: 'gravatar.com' },
		],
	},
	async rewrites() {
		return [
			{
				source: '/sitemap.xml',
				destination: '/sitemap',
			},
		]
	},
}

export default nextConfig
