"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [{ href: "/blog", label: "Blog" }];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-3 font-mono text-xs uppercase tracking-widest">
        <Link className="text-ink underline-offset-4 hover:underline" href="/">
          Gordon Liu
        </Link>

        <nav className="flex gap-8 text-muted">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`underline-offset-4 hover:text-ink hover:underline ${
                  isActive ? "font-medium text-ink" : ""
                }`}
                href={item.href}
                key={item.href}
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
