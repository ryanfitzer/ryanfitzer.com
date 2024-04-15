import million from 'million/compiler';

const millionConfig = {
  auto: {
    threshold: 0.05, // default: 0.1,
    skip: ['useBadHook', /badVariable/g], // default []
    // if you're using RSC
    auto: { rsc: true },
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    outputFileTracingExcludes: {
      // Ignore files when building distribution
      '/**': ['./content/.git', './content/**/images', './content/**/video'],
    },
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
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

// export default million.next(nextConfig, millionConfig);
export default nextConfig;
