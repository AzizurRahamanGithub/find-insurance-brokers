"use client";

import React from "react";
import Link from "next/link";

export default function FooterSections() {
  const footerSections = [
    {
      title: "Motor",
      links: [
        { label: "Car Insurance", href: "#" },
        { label: "Van Insurance", href: "#" },
        { label: "Motorbike Insurance", href: "#" },
        { label: "Courier / Delivery Insurance", href: "#" },
        { label: "Taxi Insurance", href: "#" },
        { label: "Fleet Insurance", href: "#" },
        { label: "Breakdown Cover", href: "#" },
        { label: "Car Warranty", href: "#" },
      ],
    },
    {
      title: "Home",
      links: [
        { label: "Home Insurance", href: "#" },
        { label: "Landlord Insurance", href: "#" },
        { label: "Tenant / Renters Insurance", href: "#" },
        { label: "Holiday Home Insurance", href: "#" },
        { label: "Property Owners Insurance", href: "#" },
      ],
    },
    {
      title: "Life & Health",
      links: [
        { label: "Life Insurance", href: "#" },
        { label: "Critical Illness Cover", href: "#" },
        { label: "Income Protection", href: "#" },
        { label: "Private Health Insurance", href: "#" },
        { label: "Over 50s Life Insurance", href: "#" },
      ],
    },
    {
      title: "Travel",
      links: [
        { label: "Travel Insurance", href: "#" },
        { label: "Gadget Insurance", href: "#" },
        { label: "Mobile Phone Insurance", href: "#" },
        { label: "Wedding Insurance", href: "#" },
        { label: "Event Insurance", href: "#" },
      ],
    },
    {
      title: "Pet",
      links: [
        { label: "Dog Insurance", href: "#" },
        { label: "Cat Insurance", href: "#" },
        { label: "Multi-pet Insurance", href: "#" },
        { label: "Lifetime Cover", href: "#" },
        { label: "Accident-only Cover", href: "#" },
      ],
    },
    {
      title: "Business",
      links: [
        { label: "Public Liability Insurance", href: "#" },
        { label: "Employers' Liability Insurance", href: "#" },
        { label: "Professional Indemnity Insurance", href: "#" },
        { label: "Tradesman Insurance", href: "#" },
        { label: "Shop Insurance", href: "#" },
        { label: "Commercial Property Insurance", href: "#" },
        { label: "Business Interruption Insurance", href: "#" },
      ],
    },
    {
      title: "Specialist",
      links: [
        { label: "Caravan Insurance", href: "#" },
        { label: "Motorhome Insurance", href: "#" },
        { label: "Classic Car Insurance", href: "#" },
        { label: "Modified Car Insurance", href: "#" },
        { label: "Learner Driver Insurance", href: "#" },
        { label: "Impounded Car Insurance", href: "#" },
        { label: "Gap Insurance", href: "#" },
      ],
    },
    {
      title: "Financial",
      links: [
        { label: "Payment Protection Insurance", href: "#" },
        { label: "Mortgage Protection", href: "#" },
        { label: "Loan Protection", href: "#" },
        { label: "Income Protection", href: "#" },
      ],
    },
  ];

  return (
    <div className="bg-[#050f24] text-gray-400 text-sm border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-white font-semibold tracking-wide border-b border-gray-800 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2 text-[11px] leading-tight">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#00d66d] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
