"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Search,
  CheckSquare,
  MousePointerClick,
  Car,
  Home,
  Heart,
  Plane,
  Cat,
  Briefcase,
  Shield,
  Star,
  ShieldCheck,
  Zap,
  GraduationCap,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Image from 'next/image';

interface Broker {
  logoName: string;
  logoBg: string;
  logoSub: string;
  tags: Array<{ label: string; value: string; icon?: React.ReactNode }>;
  url: string;
}

export default function HomePage() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#00d66d]" />,
      title: "Browse Insurance",
      description: "Explore insurance categories tailored to UK consumers and businesses.",
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-[#00d66d]" />,
      title: "Compare Brokers",
      description: "View FCA-authorised brokers from our limited panel and their products.",
    },
    {
      icon: <MousePointerClick className="w-8 h-8 text-[#00d66d]" />,
      title: "Get Your Quote",
      description: "Click through securely to the broker's website to request a quote.",
    },
  ];

  const categories = [
    {
      icon: <Car className="w-10 h-10 text-blue-500" />,
      title: "Motor Insurance",
      link: "/motor",
    },
    {
      icon: <Home className="w-10 h-10 text-emerald-500" />,
      title: "Home & Property Insurance",
      link: "/home-property",
    },
    {
      icon: <Heart className="w-10 h-10 text-rose-500" />,
      title: "Life & Health Insurance",
      link: "/life-health",
    },
    {
      icon: <Plane className="w-10 h-10 text-violet-500" />,
      title: "Travel & Lifestyle Insurance",
      link: "/travel-lifestyle",
    },
    {
      icon: <Cat className="w-10 h-10 text-amber-500" />,
      title: "Pet Insurance",
      link: "/business",
    },
    {
      icon: <Briefcase className="w-10 h-10 text-sky-500" />,
      title: "Business Insurance",
      link: "/business-liability",
    },
    {
      icon: <Star className="w-10 h-10 text-indigo-500" />,
      title: "Specialist Insurance",
      link: "/specialist",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-teal-500" />,
      title: "Financial Protection",
      link: "/financial-protection",
    },
  ];

  const [redirectingBroker, setRedirectingBroker] = useState<Broker | null>(null);
  const [redirectProgress, setRedirectProgress] = useState<number>(0);

  const brokers: Broker[] = [
    {
      logoName: "Admiral",
      logoBg: "bg-blue-900 text-white font-black italic",
      logoSub: "MULTI-CAR INSURANCE",
      tags: [
        {
          label: "INSURANCE OFFERED",
          value: "Third Party Fire & Theft and Comprehensive Cover",
        },
        {
          label: "MULTI-CAR DISCOUNT",
          value: "Available on 2+ cars",
          icon: <Shield className="w-4 h-4 text-emerald-500 mr-1 inline" />,
        },
        {
          label: "KEY BENEFIT",
          value: "Save up to £280* on your policy",
        },
      ],
      url: "https://www.admiral.com",
    },
    {
      logoName: "TEMPCOVER",
      logoBg: "bg-red-50 text-red-600 font-extrabold tracking-widest",
      logoSub: "TEMPORARY COVER",
      tags: [
        {
          label: "COVER TERMS",
          value: "Instant cover from 1 hour to 30 days for cars, vans and more.",
        },
        {
          label: "INSTANT COVER",
          value: "Policy in minutes",
          icon: <Zap className="w-4 h-4 text-amber-500 mr-1 inline" />,
        },
        {
          label: "APPLICABLE AGE",
          value: "Drivers aged 18 - 78",
        },
      ],
      url: "https://www.tempcover.com",
    },
    {
      logoName: "FAIR",
      logoBg: "bg-blue-800 text-white font-bold",
      logoSub: "INVESTMENT",
      tags: [
        {
          label: "COVER TERMS",
          value: "Flexible learner driver insurance for 1-90 days of practice.",
        },
        {
          label: "LEARNER STATUS",
          value: "No impact on NCB",
          icon: <GraduationCap className="w-4 h-4 text-blue-500 mr-1 inline" />,
        },
        {
          label: "APPLICABLE AGE",
          value: "Drivers aged 17 - 22",
        },
      ],
      url: "https://www.wearefair.co.uk",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (redirectingBroker) {
      setRedirectProgress(0);
      interval = setInterval(() => {
        setRedirectProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              window.open(redirectingBroker.url, "_blank");
              setRedirectingBroker(null);
            }, 500);
            return 100;
          }
          return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
        });
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [redirectingBroker]);

  return (
    <div className=" min-h-screen ">
      {/* Hero Section */}
      <section className="relative  overflow-hidden py-24 md:py-32 min-h-[80vh]">
        <div className="absolute" />
        <div className="absolute inset-0 bg-cover bg-center  " style={{ backgroundImage: "url('/images/home.png')" }} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Compare insurance <br />
              options from a panel of <br />
              <span className="text-white">FCA-</span>
              <span className="text-[#00d66d]">authorized</span> <br />
              <span className="text-[#00d66d]">insurance brokers</span>
            </h1>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/brokers"
                className="bg-[#00d66d] hover:bg-[#00c563] text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-[#00d66d]/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Browse brokers</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#explore"
                className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Explore Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Simple Steps Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center space-y-12">
          <div className="space-y-2">
            <span className="text-blue-500 font-normal text-xs tracking-widest uppercase">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Three Simple <span className="text-[#00d66d]">Steps To A Quote</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#f8fafc] border border-gray-100 rounded-2xl flex flex-col items-start space-y-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 bg-white rounded-full shadow-sm">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-[#0f265c]">{step.title}</h3>
                <p className="text-gray-500 text-left text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Insurance Section */}
      <section id="explore" className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl space-y-12">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Explore <span className="text-[#00d66d]">insurance</span>
            </h2>
            {/* <Link
              href="/brokers"
              className="text-[#0f265c] hover:text-[#00d66d] font-bold text-sm flex items-center gap-1.5 transition-colors"
            >
              <span>View all brokers</span>
              <ArrowRight size={16} />
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="p-6 bg-white border border-gray-100 rounded-2xl flex flex-col justify-between h-48 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-3 bg-[#f8fafc] rounded-xl w-fit group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-[#0f265c] text-sm md:text-base">
                    {cat.title}
                  </h3>
                  <span className="text-[#00d66d] text-xs font-semibold flex items-center gap-0.5">
                    Explore <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">&raquo;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Brokers Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl space-y-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">
            Insurance <span className="text-[#00d66d]">Brokers</span>
          </h2>

          <div className="space-y-6">
            {brokers.map((broker, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Logo Area */}
                <div className="flex flex-col items-center justify-center border border-gray-100 rounded-xl p-4 w-full md:w-48 h-24 bg-gray-50 text-center">
                  <div className={`px-4 py-1.5 rounded text-lg ${broker.logoBg}`}>
                    {broker.logoName}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                    {broker.logoSub}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 w-full text-left md:px-4">
                  {broker.tags.map((tag, tagIdx) => (
                    <div key={tagIdx} className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-black tracking-wider uppercase">
                        {tag.label}
                      </span>
                      <p className="text-sm font-semibold text-[#0f265c] leading-snug">
                        {tag.icon && tag.icon}
                        {tag.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="w-full md:w-auto self-stretch md:self-center flex items-center">
                  <button
                    type="button"
                    onClick={() => setRedirectingBroker(broker)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-center transition-colors shadow-md shadow-blue-600/10"
                  >
                    Get Quotes &raquo;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {redirectingBroker && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-gray-150 p-8 rounded-3xl w-full max-w-md shadow-xl space-y-6 flex flex-col items-center">
            <div className="flex items-center text-2xl font-black tracking-tight mb-2">
              <span className="text-[#00d66d] flex items-center">
                <svg
                  className="w-8 h-8 mr-1 text-[#00d66d]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                find
              </span>
              <span className="text-[#0f265c]">insurance</span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-[#0f265c]">
              Redirecting you to {redirectingBroker.logoName}
            </h3>

            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 px-1">
                <span>Preparing your quote...</span>
                <span>{redirectProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${redirectProgress}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs">
              If you are not automatically redirected, click the button below.
            </p>

            <a
              href={redirectingBroker.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-1.5 text-xs shadow-md transition-colors w-full justify-center"
            >
              <span>Click here</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
     
    </div>
  );
}
