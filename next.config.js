/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/coming-soon-website' : '',
  output: 'export',
  distDir: 'dist',
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

    // config.module.rules.push(
    //   // Reapply the existing rule, but only for svg imports ending in ?url
    //   {
    //     ...fileLoaderRule,
    //     test: /\.svg$/i,
    //     resourceQuery: /url/, // *.svg?url
    //   },
    //   // Convert all other *.svg imports to React components
    //   {
    //     test: /\.svg$/i,
    //     issuer: fileLoaderRule.issuer,
    //     resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
    //     use: ['@svgr/webpack'],
    //   },
    // );

    // // Modify the file loader rule to ignore *.svg, since we have it handled now.
    // fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
