/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        // pathname: '/my-bucket/**',
        // search: '',
      },
    ],
  },

};

export default nextConfig;
