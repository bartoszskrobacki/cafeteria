import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack(config, { dir }) {
    // Replicate what createNextIntlPlugin does for webpack.
    // Cannot use the plugin on FreeBSD as it imports @swc/core (no FreeBSD binary).
    // Turbopack also doesn't work with WASM bindings, so we use webpack.
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias['next-intl/config'] = path.resolve(dir, './i18n/request.ts');
    return config;
  },
};

export default nextConfig;
