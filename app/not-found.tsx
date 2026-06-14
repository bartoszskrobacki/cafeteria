import type { Metadata } from "next";

// Statyczny host serwuje out/404.html dla nieznanych ścieżek.
// Zamiast strony 404 — standardowy redirect (meta refresh) na stronę główną.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <meta httpEquiv="refresh" content="0; url=/pl/" />;
}
