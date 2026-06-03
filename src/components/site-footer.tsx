import Link from "next/link";
import { navLinks } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#080705] px-5 py-10 text-[#f3e6cc]/62 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>
            <span className="font-serif text-xl text-[#fff8ec]">Docklands 1998</span> - Melbourne chauffeur service.
          </p>
          <p className="mt-2 max-w-xl text-[0.68rem] leading-5 text-[#f3e6cc]/42">
            Puffing Billy image by{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Puffing_Billy_locomotive_8A_hauling_train_towards_Belgrave_on_Gembrook_Railway_near_Belgrave_-_June_2023_-_01.jpg"
              className="footer-link"
            >
              Philip Mallis
            </a>
            , licensed under{" "}
            <a href="https://creativecommons.org/licenses/by-sa/2.0/" className="footer-link">
              CC BY-SA 2.0
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
