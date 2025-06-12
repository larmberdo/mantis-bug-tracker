/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages部署配置
  basePath: process.env.NODE_ENV === 'production' ? '/mantis-bug-tracker' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mantis-bug-tracker/' : '',
}

module.exports = nextConfig 