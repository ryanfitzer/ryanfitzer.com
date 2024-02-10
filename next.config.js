/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    outputFileTracingExcludes: {
        '/blog/**': ['./src/app/content/**/images'],
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
