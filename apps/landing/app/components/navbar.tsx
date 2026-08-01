"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-14 items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "max-w-4xl border-line bg-surface/85 shadow-lg shadow-ink/5 backdrop-blur-md"
            : "max-w-6xl border-transparent bg-transparent"
        }`}
      >
        <a href="#" className="relative z-10 flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Kira"
            width={32}
            height={32}
            className="size-8 rounded-md"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-ink">
            Kira
          </span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-accent transition-colors hover:text-accent-soft"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href="#"
            className="hidden px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink active:translate-y-px sm:block"
          >
            Log in
          </a>
          <a
            href="#cta"
            className="rounded-none bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-soft active:translate-y-px"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
