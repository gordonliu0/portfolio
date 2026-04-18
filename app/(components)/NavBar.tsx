"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
	{ label: "Projects", link: "/projects" },
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-10">
			<div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-3 font-mono text-xs uppercase tracking-widest">
				<Link
					href="/"
					className="text-ink underline-offset-4 hover:underline"
				>
					Gordon Liu
				</Link>

				<nav className="flex gap-8 text-muted">
					{nav.map((item) => {
						const active =
							pathname === item.link || pathname.startsWith(`${item.link}/`);
						return (
							<Link
								key={item.link}
								href={item.link}
								aria-current={active ? "page" : undefined}
								className={`underline-offset-4 hover:text-ink hover:underline ${
									active ? "font-medium text-ink" : ""
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
}
