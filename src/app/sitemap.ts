import { MetadataRoute } from "next";

const URL = "https://app.skyderdigital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/"]
    .map((route) => [
      {
        url: `${URL}/es${route}`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${URL}/en${route}`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${URL}/pt${route}`,
        lastModified: new Date().toISOString(),
      },
    ])
    .flat();
  return [...routes];
}
