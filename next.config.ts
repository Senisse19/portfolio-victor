import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.15"],
  async redirects() {
    return [
      { source: "/ecossistema", destination: "/#explorador", permanent: true },
      { source: "/projetos/automatax", destination: "/#case-automatax", permanent: true },
      { source: "/projetos/plataforma-lei-do-bem", destination: "/#case-plataforma-lei-do-bem", permanent: true },
      { source: "/projetos/taxswap", destination: "/#case-taxswap", permanent: true },
      { source: "/projetos/social-intelligence-pwa", destination: "/#case-social-intelligence-pwa", permanent: true },
    ];
  },
};

export default nextConfig;
