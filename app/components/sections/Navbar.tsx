'use client';

import { useState } from 'react';
import Link from 'next/link';
import { site } from '@/data/site';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">🌈</span>
          <div className="leading-tight">
            <p className="font-extrabold text-orange-500 text-sm sm:text-base">Brilliant Beginnings</p>
            <p className="text-xs text-teal-500 font-semibold tracking-wide hidden sm:block">Childcare</p>
          </div>
        </Link>

        {/* Phone — center */}
        <a
          href={`tel:${site.phone}`}
          className="hidden md:flex items-center gap-1 text-gray-700 font-semibold hover:text-orange-500 transition-colors"
        >
          <span className="text-lg">📞</span>
          <span>{site.phone}</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
          <a href="#faq" className="hover:text-orange-500 transition-colors">FAQ</a>
          <Link href="/calendar" className="hover:text-orange-500 transition-colors">Calendar</Link>
          <a
            href="#enroll"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-bold transition-colors"
          >
            {site.cta}
          </a>
        </div>

        {/* Mobile: phone + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a href={`tel:${site.phone}`} className="text-orange-500 font-bold text-sm">
            📞 Call
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-orange-500"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-gray-700 font-medium">
          <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">About</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">FAQ</a>
          <Link href="/calendar" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Calendar</Link>
          <a href={`tel:${site.phone}`} className="text-gray-600">{site.phone}</a>
          <a
            href="#enroll"
            onClick={() => setMenuOpen(false)}
            className="bg-orange-500 text-white text-center py-2 rounded-full font-bold"
          >
            {site.cta}
          </a>
        </div>
      )}
    </header>
  );
}
