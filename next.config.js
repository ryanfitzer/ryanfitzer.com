/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        outputFileTracingExcludes: {
            '/**': [
                './content/.git',
                './content/**/images',
                './content/**/video',
            ],
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
