import type { MetadataRoute } from "next";
import { site } from "@/content/data";
import { locales } from "@/content/ui";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`]));
  return locales.map((l) => ({ url: `${site.url}/${l}`, alternates: { languages } }));
}
