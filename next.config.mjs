/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

// next-intl plugin imports @swc/core which has no FreeBSD native binary.
// The plugin is only needed during `next build` (sets webpack alias for next-intl/config).
// During `next start`, the alias is already baked into the compiled output.
const isStart = process.argv.some((arg) => arg === 'start');

let finalConfig = nextConfig;
if (!isStart) {
  const { default: createNextIntlPlugin } = await import('next-intl/plugin');
  const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
  finalConfig = withNextIntl(nextConfig);
}

export default finalConfig;
