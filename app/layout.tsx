import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  description: "Software Engineering, Machine Learning, Mathematics",
  icons: { shortcut: "/favicon.png" },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    description: "Software Engineering, Machine Learning, Mathematics",
    locale: "en-US",
    siteName: "gordonliu.com",
    title: "Gordon Liu",
    type: "website",
    url: "https://gordonliu.com",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "Gordon Liu — Machine Learning and Startups",
    template: "%s · gordonliu.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body>
        <NavBar />
        <main className="mx-auto max-w-[1400px] px-8 py-20 sm:py-28">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
