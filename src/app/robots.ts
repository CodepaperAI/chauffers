import type { MetadataRoute } from "next";

const SITE_URL = "https://docklands1998.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
