/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    return 'ml-progress-' + Date.now().toString(36);
  },
}

export default nextConfig
