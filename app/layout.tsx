import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
	metadataBase: new URL("http://localhost:3000"),
	title: {
		default: "Gordon Liu — Machine Learning and Startups",
		template: "%s · gordonliu.com",
	},
	description: "Software Engineering, Machine Learning, Mathematics",
	openGraph: {
		title: "Gordon Liu",
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
	icons: { shortcut: "/favicon.png" },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable}`}
		>
			<body>
				<NavBar />
				<main className="mx-auto max-w-[1400px] px-8 py-20 sm:py-28">
					{children}
				</main>
			</body>
		</html>
	);
}
