"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">

        {/* Logo + description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Open Gallery</h2>
          <p className="text-sm text-gray-400">
            Discover high-quality free photos from talented creators around the world.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Credits</h3>
          <p className="text-sm text-gray-400">
            Images powered by Unsplash API.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Open Gallery — All rights reserved
      </div>
    </footer>
  );
}