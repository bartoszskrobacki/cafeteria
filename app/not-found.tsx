import type { Metadata } from "next";

// Statyczny host serwuje out/404.html (ze statusem 404) dla nieznanych ścieżek.
// Next.js dokłada domyślny <html>/<body> (root layout jest w app/[locale]), więc renderujemy tylko treść.
// Prosta, dwujęzyczna strona z linkami zamiast automatycznego przekierowania.
export const metadata: Metadata = {
  title: "404 – Stołówka Studencka u Piotra",
  robots: { index: false, follow: true },
};

const linkStyle = {
  display: "inline-block",
  margin: "0.5rem",
  padding: "0.75rem 1.5rem",
  background: "#c8553d",
  color: "#fff",
  textDecoration: "none",
  letterSpacing: "0.05em",
} as const;

export default function NotFound() {
  return (
    <main
      lang="pl"
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#fbfaf6",
        color: "#1a2233",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Nie znaleziono strony</h1>
        <p style={{ color: "#6b7280", marginTop: 0 }}>Page not found</p>
        <p style={{ margin: "1.5rem 0" }}>
          Stołówka Studencka u Piotra · ul. Łużycka 24, Gliwice ·{" "}
          <a href="tel:+48322372347" style={{ color: "inherit" }}>
            +48 32 237 23 47
          </a>
        </p>
        <nav>
          <a href="/pl/" style={linkStyle}>
            Strona główna
          </a>
          <a href="/pl/menu/" style={linkStyle}>
            Menu
          </a>
          <a href="/en/" style={linkStyle}>
            English
          </a>
        </nav>
      </div>
    </main>
  );
}
