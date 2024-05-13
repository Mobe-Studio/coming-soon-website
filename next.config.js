/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  output: 'export',
  distDir: 'dist',
  webpack(config) {
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
