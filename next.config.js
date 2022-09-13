/** @type {import('next').NextConfig} */


const withTM = require('next-transpile-modules')(['@fancyapps/ui']);

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  basePath: '/ecom',
};

module.exports = withTM(nextConfig);
