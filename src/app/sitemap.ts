import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
