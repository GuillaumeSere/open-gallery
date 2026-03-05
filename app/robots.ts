export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: "https://open-gallery.vercel.app/sitemap.xml",
    };
  }