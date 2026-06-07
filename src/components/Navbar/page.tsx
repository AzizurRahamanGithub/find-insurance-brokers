"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from 'next/image';
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Motor", href: "/motor" },
    { label: "Home", href: "/home" },
    { label: "Life & Health", href: "/life-health" },
    { label: "Travel", href: "/travel" },
    { label: "Pet", href: "/pet" },
    { label: "Business", href: "/business" },
    { label: "Specialist", href: "/specialist" },
    { label: "Financial", href: "/financial" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto  py-2 px-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="">
             <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={200}
                  height={100}
                />

          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-[#00d66d] ${
                    isActive(link.href) ? "text-[#00d66d]" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#0f265c] hover:text-[#00d66d] focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white absolute top-full left-0 w-full shadow-lg z-50 p-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-semibold py-2 transition-colors duration-200 hover:text-[#00d66d] ${
                    isActive(link.href) ? "text-[#00d66d]" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
