/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        outputFileTracingExcludes: {
            '/**': ['./src/content/.git', './src/content/**/images'],
        },
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'http',
    //             hostname: 'res.cloudinary.com',
    //             port: '',
    //             pathname: '**',
    //         },
    //     ],
    // },
};

module.exports = nextConfig;
