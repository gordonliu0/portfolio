// "use client";
// DEFAULTS
import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

// // NAVIGATION
// import { Navigation } from "./components/Navigation";

// // BACKGROUND
// import { BackgroundCircles } from "./components/Background";
// import Script from "next/script";
// import styles from "./style.module.scss";

// Background
import { GradientBackground } from "./components/background";

export const metadata: Metadata = {
  title: {
    default: "gordon liu",
    template: "gordonliu.com",
  },
  description: "Software Engineer, Data Scientist, Polymath",
  openGraph: {
    title: "gordonliu",
    description: "Software Engineer, Data Scientist, Polymath",
    url: "https://gordonliu.com",
    siteName: "gordonliu.com",
    // images: [
    //   {
    //     url: "https://chronark.com/og.png",
    //     width: 1920,
    //     height: 1080,
    //   },
    // ],
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
  variable: "--font-inter",
});

// Elements
import { ParallaxText } from "./components/parallaxtext";

// const calSans = LocalFont({
// 	src: "../public/fonts/CalSans-SemiBold.ttf",
// 	variable: "--font-calsans",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[inter.variable].join(" ")}
      suppressHydrationWarning
    >
      {/* <head></head> */}
      <body>
        <GradientBackground />
        <div className="absolute z-[2] flex flex-row h-screen w-screen items-center justify-center">
          <div className="flex flex-row items-end">
            <div className="relative bottom-2 ml-10 z-10 rounded-xl h-[640px] w-[960px] bg-[#F5F5F9] shadow-2xl bg-opacity-40">
              {children}
            </div>
            <div className="relative top-2 right-12 rounded-xl h-[640px] w-[226px] pl-12 shadow-2xl">
              <ul className="flex flex-col p-2 gap-2 w-full text-white text-4xl font-semibold underline break-words">
                <li>RESEARCH</li>
                <li>BOOKSHELF</li>
                <li>PROJECTS</li>
                <li>WRITING</li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
