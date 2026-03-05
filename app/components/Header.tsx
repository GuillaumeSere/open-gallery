"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl text-gray-900 font-bold">
         Open Gallery
        </Link>

        <nav className="hidden text-gray-900 md:flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/gallery">Gallery</Link>
        </nav>

        <button
          className="md:hidden text-gray-900"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 text-gray-900 pb-4 flex flex-col gap-4 bg-white">
          <Link href="/">Home</Link>
          <Link href="/gallery">Gallery</Link>
        </div>
      )}
    </header>
  );
}