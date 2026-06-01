import React from 'react';
import Link from 'next/link';

const Header = () => {
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

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* We will replace this with the actual logo image once available */}
          <div className="flex items-center">
            <div className="bg-brand-dark text-white p-2 rounded-l-md font-bold text-xl leading-none">find</div>
            <div className="text-brand-green font-bold text-xl leading-none">insurance</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {/* <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-brand-green transition-colors">
              {link.label}
            </Link>
          ))}
        </nav> */}

        {/* Mobile menu button (placeholder) */}
        <button className="lg:hidden p-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
