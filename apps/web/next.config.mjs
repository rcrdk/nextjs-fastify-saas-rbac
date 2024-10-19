/** @type {import('next').NextConfig} */
const nextConfig = {
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
