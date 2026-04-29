/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable optimizations for CSS/styling
    reactStrictMode: true,
    
    // Ensure Tailwind CSS is properly bundled
    experimental: {
        optimizePackageImports: ["react-icons"],
    },
    
    // Serve public/index.html at root /
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/index.html'
            }
        ]
    }
}

module.exports = nextConfig
