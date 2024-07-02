/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pizza",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
