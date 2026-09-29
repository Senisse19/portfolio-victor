import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://victorsenisse.me"),
  title: {
    default: "Victor Senisse | Full-stack · Automação & IA",
    template: "%s | Victor Senisse",
  },
  description: "Desenvolvedor full-stack com foco em automação e IA: integrações, RPAs, produtos web e agentes de IA do modelo de dados ao deploy.",
  keywords: ["automação", "full-stack", "Next.js", "Python", "FastAPI", "agentes de IA", "RPA", "Victor Senisse"],
  authors: [{ name: "Victor Senisse", url: "https://victorsenisse.me" }],
  creator: "Victor Senisse",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "/",
    title: "Victor Senisse | Full-stack · Automação & IA",
    description: "Transformo processos manuais em sistemas automatizados, inteligentes e escaláveis.",
    siteName: "Victor Senisse",
  },
  twitter: {
    card: "summary",
    title: "Victor Senisse | Full-stack · Automação & IA",
    description: "Automação ponta a ponta, produtos full-stack e IA aplicada.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <Providers>
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Victor Senisse",
                url: "https://victorsenisse.me",
                jobTitle: "Full-stack Developer · Automation & AI",
                sameAs: [
                  "https://github.com/Senisse19",
                  "https://www.linkedin.com/in/victorsenisse/",
                ],
                knowsAbout: ["Automation", "Full-stack Development", "Artificial Intelligence", "RPA", "Data Engineering"],
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
