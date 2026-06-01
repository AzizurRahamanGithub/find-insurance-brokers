"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  Mail,
  ArrowRight,
  CheckCircle2,
  Star,
  Building2,
  Handshake,
} from "lucide-react";

const stats = [
  { icon: <Building2 size={22} />, value: "100+", label: "Brokers Vetted" },
  { icon: <Users size={22} />, value: "1.5M+", label: "Quotes Generated" },
  { icon: <Star size={22} />, value: "4.8", label: "Trustpilot Score" },
  { icon: <Award size={22} />, value: "10+", label: "Years in UK Service" },
];

const values = [
  {
    icon: <Shield size={24} />,
    title: "FCA Compliant & Regulated",
    description:
      "We strictly connect users with brokers authorised and regulated by the Financial Conduct Authority (FCA).",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Fair Comparison",
    description:
      "Our matching algorithms compare options fairly based on your criteria, with no bias or hidden fees.",
  },
  {
    icon: <Handshake size={24} />,
    title: "Customer Centricity",
    description:
      "We build our referral paths and forms with user privacy and speed in mind, making quotes secure and simple.",
  },
  {
    icon: <Star size={24} />,
    title: "100% Free Service",
    description:
      "Using FindInsurance is free. We might receive referral commission from brokers without impacting your quote price.",
  },
];

const team = [
  {
    name: "Sophia Mitchell",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "15+ years in fintech and insurance comparison services across Europe and the UK.",
  },
  {
    name: "James Thornton",
    role: "Head of Broker Partnerships",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    bio: "Dedicated to expanding and vetting our FCA regulated insurance broker panels.",
  },
  {
    name: "Aisha Rahman",
    role: "Senior Customer Success Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Maintains high quality standards and responses across all customer inquiries.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafc] text-[#0f265c] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-[#0b1b3d] flex items-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          alt="FindInsurance Office"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#00d66d]/10 border border-[#00d66d]/20 text-[#00d66d] text-xs font-bold px-4 py-1.5 rounded-full">
            <Building2 size={14} /> Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
            Empowering UK Consumers to Find the Best Cover
          </h1>
          <p className="text-gray-300 text-base max-w-xl leading-relaxed">
            FindInsurance was built to simplify the search for trusted, FCA-regulated insurance brokers, bringing transparency and reliability to your fingertips.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#00d66d] text-white font-bold px-6 py-3 rounded-xl hover:brightness-105 transition text-sm"
          >
            Compare Quotes <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-2">
                <div className="w-12 h-12 bg-[#00d66d]/10 rounded-2xl flex items-center justify-center mx-auto text-[#00d66d]">
                  {s.icon}
                </div>
                <div className="text-2xl font-extrabold text-[#0f265c]">{s.value}</div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full">
              <Shield size={14} /> Our Mission
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f265c] tracking-tight leading-tight">
              Bridging the Gap Between Users and Regulated Insurance
            </h2>
            <p className="text-gray-500 text-sm leading-loose">
              Finding the right policy shouldn't be stressful or filled with sales pressure. We act as
              an introducer connecting you directly to verified brokers, leaving negotiations simple,
              honest, and regulated.
            </p>
            <ul className="space-y-3">
              {[
                "Highly vetted panel of FCA-authorised brokers",
                "Wide coverage from Motor, Home to Specialist insurance",
                "Fully transparent referral links with no added fees",
                "Secure data practices protecting customer details",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#0f265c]">
                  <CheckCircle2 size={16} className="text-[#00d66d] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
              alt="FindInsurance Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white border-y border-gray-100 py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full">
              <Star size={14} /> What We Stand For
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f265c]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="group bg-[#f8fafc] border border-gray-150 rounded-2xl p-6 space-y-3 hover:border-[#00d66d]/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#00d66d]/10 rounded-xl flex items-center justify-center text-[#00d66d] group-hover:bg-[#00d66d] group-hover:text-white transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-extrabold text-[#0f265c]">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl py-20">
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full">
            <Users size={14} /> Meet the Team
          </div>
          <h2 className="text-3xl font-extrabold text-[#0f265c]">The Faces Behind FindInsurance</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Our team brings decades of cumulative comparison service experience to help you find the right quotes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition text-center"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <h3 className="font-extrabold text-[#0f265c]">{member.name}</h3>
                <div className="text-xs text-[#00d66d] font-bold uppercase tracking-wider">
                  {member.role}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
