import "../global.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { GradientBackground } from "./(components)/HoverBackground";
import NavBar from "./(components)/NavBar";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Gordon Liu | Machine Learning and Startups",
    template: "gordonliu.com",
  },
  description: "Software Engineering, Machine Learning, Mathematics",
  openGraph: {
    title: "gordonliu",
    description: "Software Engineering, Machine Learning, Mathematics",
    url: "https://gordonliu.com",
    siteName: "gordonliu.com",
    locale: "en-US",
    type: "website",
  },
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
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <GradientBackground />
        <div className="absolute z-[2] flex flex-row h-full w-full items-start justify-start">
          <NavBar />
          <div className="h-min w-full z-10 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#FFFFFF99] px-8 sm:h-full md:px-16 lg:px-24 xl:px-32">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
