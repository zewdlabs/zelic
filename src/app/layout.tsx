import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Zelic",
    template: "%s | Zelic",
  },

  canonical: "https://zelic.zewdlabs.tech",

  description: "An easy way to add comments or reviews to your static site.",
  keywords: ["comments", "reviews", "feedback", "static", "site"],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    shortcut: "/favicon.ico",
    // apple: [
    //   {
    //     src: "/apple-touch-icon.png",
    //     sizes: "180x180",
    //     type: "image/png",
    //   },
    // ],
    // favicons: [
    //   {
    //     src: "/android-chrome-192x192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //   },
    //   {
    //     src: "/android-chrome-512x512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //   },
    // ],
  },

  // openGraph: {
  //   title: "Zelic",
  //   description: "An easy way to add comments or reviews to your static site.",
  //   url: "https://zelic.vercel.app",
  //   siteName: "Zelic",
  //   images: [
  //     {
  //       url: "https://zelic.vercel.app/og.png",
  //       width: 1920,
  //       height: 1080,
  //     },
  //   ],
  //   locale: "en-US",
  //   type: "website",
  //   // robots: {
  //   //   index: true,
  //   //   follow: true,
  //   //   googleBot: {
  //   //     index: true,
  //   //     follow: true,
  //   //     "max-video-preview": -1,
  //   //     "max-image-preview": "large",
  //   //     "max-snippet": -1,
  //   //   },
  //   // },
  // },

  // twitter: {
  //   title: "Zelic",
  //   card: "summary_large_image",
  // },

  // seo: {
  //
  //   title: "Zelic",
  //   description: "An easy way to add comments or reviews to your static site.",
  //   keywords: ["comments", "reviews", "feedback", "static", "site"],
  //
  //  canonical: "https://zelic.vercel.app",
  // },

  // verification: {
  //   // google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
  //   yandex: "a7eeb2bba291540a",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("antialiased min-h-screen", inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
