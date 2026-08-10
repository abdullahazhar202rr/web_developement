export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://abdullahazhar202rr.vercel.app/sitemap.xml",
  };
}
