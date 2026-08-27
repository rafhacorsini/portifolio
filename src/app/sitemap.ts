import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.rcorsini.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          pt: "https://www.rcorsini.com",
          en: "https://www.rcorsini.com/en",
        },
      },
    },
  ];
}
