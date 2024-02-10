/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // outputFileTracingExcludes: {
    //     '/blog': ['./un-necessary-folder/**/*'],
    //   },
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
