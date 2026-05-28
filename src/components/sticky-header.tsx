"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contactLinks, navLinks } from "@/data/site";
import { phoneDisplay } from "@/lib/booking";

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#0d0b08]/90 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-8"
      >
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 focus-ring sm:gap-3">
          <span className="grid size-10 shrink-0 place-items-center border border-[#c7a76a]/55 bg-[#17130d]/70 font-serif text-lg font-semibold text-[#f4e8ce] transition-colors group-hover:border-[#f4d58d] sm:size-11">
            D
          </span>
          <span className="min-w-0 leading-none">
            <span className="block font-serif text-lg font-semibold text-[#fff8ec] sm:text-xl">
              Docklands
            </span>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#c7a76a] sm:text-[0.68rem] sm:tracking-[0.34em]">
              1998
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link focus-ring text-sm font-medium text-[#f8ecd4]/78"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={contactLinks.phone}
            className="hidden min-h-11 items-center text-sm font-semibold text-[#fff8ec] focus-ring sm:inline-flex"
          >
            {phoneDisplay}
          </a>
          <a href={contactLinks.whatsapp} className="btn btn-gold header-whatsapp">
            WhatsApp
          </a>
          <Link href="/contact#contact" className="btn btn-ivory header-book">
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}
