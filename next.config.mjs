/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // Replicate what createNextIntlPlugin does for Turbopack.
      // Cannot use the plugin on FreeBSD as it imports @swc/core (no FreeBSD binary).
      'next-intl/config': './i18n/request.ts',
    },
  },
};

export default nextConfig;
