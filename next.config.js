/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@fancyapps/ui']);

const nextConfig = {
  swcMinify: true,
};

module.exports = withTM(nextConfig);
