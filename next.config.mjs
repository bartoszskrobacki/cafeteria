import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dir }) {
    // Manually replicate createNextIntlPlugin behavior.
    // The plugin imports @swc/core which has no FreeBSD binary on npm.
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias['next-intl/config'] = path.resolve(dir, './i18n/request.ts');
    return config;
  },
};

export default nextConfig;
