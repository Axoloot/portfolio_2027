import type { MetadataRoute } from "next";
import { site } from "@/content/data";

const pages = ["", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) =>
    (["en", "fr"] as const).map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path ? 0.6 : 1,
      alternates: { languages: { en: `${site.url}/en${path}`, fr: `${site.url}/fr${path}` } },
    })),
  );
}
