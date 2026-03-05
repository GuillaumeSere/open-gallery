import "./globals.css";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";

export const metadata = {
    title: {
      default: "Open Gallery - Free High Quality Photos",
      template: "%s | Open Gallery",
    },
    description:
      "Explore a beautiful collection of high-quality free photos from talented photographers around the world. Discover inspiration for your projects.",
  
    keywords: [
      "free photos",
      "photo gallery",
      "high quality images",
      "free stock photos",
      "photography inspiration",
      "unsplash gallery",
    ],
  
    authors: [{ name: "Open Gallery" }],
  
    creator: "Open Gallery",
  
    metadataBase: new URL("https://open-gallery.vercel.app/"),
  
    openGraph: {
      title: "Open Gallery - Free High Quality Photos",
      description:
        "Discover stunning free images from photographers worldwide.",
      url: "https://open-gallery.vercel.app/",
      siteName: "Open Gallery",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Open Gallery",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  
    twitter: {
      card: "summary_large_image",
      title: "Open Gallery - Free High Quality Photos",
      description:
        "Discover stunning free images from photographers worldwide.",
      images: ["/og-image.jpg"],
    },
  
    robots: {
      index: true,
      follow: true,
    },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <head>
        <meta name="google-site-verification" content="nwVPqsKRGvHVh9v-Qn4QoawQzNbN99Sfg6usOSlUEhg" />
        </head>
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
