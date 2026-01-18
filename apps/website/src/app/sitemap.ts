import { ROUTES, ROUTES_WITH_WEBSITE_URL, WEBSITE_URL } from "@/lib/config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: ROUTES_WITH_WEBSITE_URL.HOME,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: ROUTES_WITH_WEBSITE_URL.LOGIN,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: ROUTES_WITH_WEBSITE_URL.CONTACT,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
