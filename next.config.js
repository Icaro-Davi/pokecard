/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: '/dist',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/PokeAPI/sprites/**'
            }
        ]
    }
}

module.exports = nextConfig
