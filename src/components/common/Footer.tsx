"use client";

import FooterSections from "@/components/common/FooterSections";
import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050f24] text-gray-400 text-sm">
       <FooterSections />
      {/* Middle Brand and About */}
      <div className="border border-gray-700">
        <div className="container mx-auto px-4 md:px-8  py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left side: Logo & Badges */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-1.5">
                <div className="">
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={350}
                      height={200}
                    />
                </div>
              </Link>

              {/* App badges */}
              <div className="flex flex-wrap gap-3">
                {/* App Store */}
                <Link href="/" className="flex items-center gap-1.5">
                <div className="">
                    <Image
                      src="/images/android.png"
                      alt="Logo"
                      width={160}
                      height={150}
                    />
                </div>
              </Link>

                {/* Google Play */}
               <Link href="/" className="flex items-center gap-1.5">
                <div className="">
                    <Image
                      src="/images/apple.png"
                      alt="Logo"
                      width={160}
                      height={200}
                    />
                </div>
              </Link>
              </div>
            </div>

            {/* Right side: Navigation Links, Description, Socials */}
            <div className="flex flex-col items-end">
              <div className="flex flex-col space-y-6 lg:text-right">
              {/* Navigation links */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-300 font-semibold lg:justify-start">
                <Link href="#" className="hover:text-[#00d66d]">About Us</Link>
                <Link href="#" className="hover:text-[rgba(0, 82, 204, 1)]">How It Works</Link>
                <Link href="#" className="hover:text-[#00d66d]">Our Brokers</Link>
                <Link href="#" className="hover:text-[#00d66d]">Careers</Link>
                <Link href="#" className="hover:text-[#00d66d]">Press</Link>
                <Link href="#" className="hover:text-[#00d66d]">Contact Us</Link>
              </div>

              {/* FCA disclaimer summary */}
              <p className="text-xs text-start text-gray-400 max-w-md  ">
                Findinsurance is an FCA introducer service that connects UK consumers with authorised
                insurance brokers. We do not provide financial advice.
              </p>

              {/* Social icons */}
              <div className="flex gap-3 lg:justify-start">
                <Link href="#" className="bg-gray-800 hover:bg-[#00d66d] hover:text-black p-2 rounded-xl text-white transition-colors">
                  <Facebook size={16} />
                </Link>
                <Link href="#" className="bg-gray-800 hover:bg-[#00d66d] hover:text-black p-2 rounded-xl text-white transition-colors">
                  <Twitter size={16} />
                </Link>
                <Link href="#" className="bg-gray-800 hover:bg-[#00d66d] hover:text-black p-2 rounded-xl text-white transition-colors">
                  <Instagram size={16} />
                </Link>
                <Link href="#" className="bg-gray-800 hover:bg-[#00d66d] hover:text-black p-2 rounded-xl text-white transition-colors">
                  <Youtube size={16} />
                </Link>
                <Link href="#" className="bg-gray-800 hover:bg-[#00d66d] hover:text-black p-2 rounded-xl text-white transition-colors">
                  <Linkedin size={16} />
                </Link>
              </div>
              </div>
            </div>
          </div>
          <p className="leading-relaxed text-justify mt-8">
          Findinsurance is a trading name of Guido Limited. Registered in England & Wales: Company
          registration number: xxxxxx. Registered Office: xxxxxxxxxxx. We act as an introducer. We
          may receive a commission or fee from brokers if you clickthrough to their website or take
          out a policy. This does not affect the price you pay.
        </p>
        </div>
      </div>
      {/* Bottom Legal & Disclaimer */}
      <div className="container mx-auto px-4 md:px-8  py-8 text-xs text-gray-400 space-y-6">
        

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-900">
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-gray-300">Terms & Conditions</Link>
            <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300">Cookie Policy</Link>
            <Link href="#" className="hover:text-gray-300">Complaints Policy</Link>
          </div>
          <p>© {new Date().getFullYear()} Guido Limited trading as Findinsurance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
