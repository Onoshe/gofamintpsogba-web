/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost:3000',
          pathname: '**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'quickrecords.gofamintpsogba.org',
          pathname: '**',
        },
      ],
      formats: ['image/avif', 'image/webp']
    },
}

export default nextConfig;
