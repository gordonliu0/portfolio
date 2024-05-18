import "../global.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { GradientBackground } from "./components/GradientBackground";
import { NavItem } from "./components/NavItem";

// import LocalFont from "next/font/local";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
const nav = [
  {
    active: true,
    display: "ABOUT",
    link: "/",
  },
  {
    active: false,
    display: "RESEARCH",
    link: "/research",
  },
  {
    active: false,
    display: "WRITING",
    link: "/writing",
  },
  {
    active: true,
    display: "BOOKSHELF",
    link: "/bookshelf",
  },
  {
    active: true,
    display: "PROJECTS",
    link: "/projects",
  },
];

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
          <div className="flex flex-row items-center">
            <div className="rounded-xl h-[680px] w-[226px] shadow-2xl">
              <ul className="flex flex-col p-4 gap-2 w-full text-white text-2xl font-semibold underline break-words">
                {nav.map((item) => item.active && <NavItem item={item} />)}
              </ul>
            </div>
            <div className="overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#FFFFFF99] relative bottom-2 ml-10 z-10 rounded-xl h-[680px] w-[1080px] bg-[#F5F5F9] shadow-2xl bg-opacity-40">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
