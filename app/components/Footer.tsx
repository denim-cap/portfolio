"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm sm:text-base">
            © 2025 Takuya Yamaguchi / denimcap
          </p>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="#about"
              className="text-sm sm:text-base hover:text-orange-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-sm sm:text-base hover:text-orange-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#works"
              className="text-sm sm:text-base hover:text-orange-400 transition-colors"
            >
              Works
            </Link>
            <Link
              href="#contact"
              className="text-sm sm:text-base hover:text-orange-400 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

