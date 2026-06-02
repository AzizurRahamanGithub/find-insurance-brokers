"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import {
  SlidersHorizontal,
  RefreshCw,
  Star,
  Shield,
  Zap,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

interface CategoryData {
  title: string;
  description: string;
  heroImage: string;
  subCategories: string[];
  aboutText: string;
}

const CATEGORY_MAP: Record<string, CategoryData> = {
  motor: {
    title: "Motor Insurance",
    description: "Compare trusted car insurance brokers and get a quote that's right for you.",
    heroImage:
      "/images/moto.png",
    subCategories: [
      "Car Insurance",
      "Van Insurance",
      "Motorbike Insurance",
      "Courier / Delivery Insurance",
      "Taxi Insurance",
      "Fleet Insurance",
      "Breakdown Cover",
      "Car Warranty",
    ],
    aboutText:
      "Cover for cars, vans, bikes & fleets across the UK. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers offering motor insurance and related products.",
  },
  home: {
    title: "Home & Property Insurance",
    description:
      "Find FCA-authorised brokers offering buildings, contents, and landlord insurance to protect your property.",
    heroImage:
      "/images/house.png",
    subCategories: [
      "Home Insurance",
      "Buildings Insurance",
      "Contents Insurance",
      "Combined Insurance",
      "Landlord Insurance",
      "Tenant / Renters Insurance",
      "Holiday Home Insurance",
      "Property Owners Insurance",
    ],
    aboutText:
      "Buildings, contents and landlord cover from UK brokers. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers offering home & property insurance and related products.",
  },
  "life-health": {
    title: "Life & Health Insurance",
    description:
      "Compare life, health and critical illness insurance policies to protect yourself and your loved ones.",
    heroImage:
      "/images/life.png",
    subCategories: [
      "Life Insurance",
      "Critical Illness Cover",
      "Income Protection",
      "Private Health Insurance",
      "Over 50s Life Insurance",
      "Child Cover",
    ],
    aboutText:
      "Protect your family and your health with policies from leading UK brokers. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers.",
  },
  travel: {
    title: "Travel & Lifestyle Insurance",
    description:
      "Find travel and lifestyle cover including single trip, annual multi-trip, gadget and mobile phone insurance.",
    heroImage:
      "/images/travel.png",
    subCategories: [
      "Travel Insurance",
      "Single Trip",
      "Annual Multi-trip",
      "Gadget Insurance",
      "Mobile Phone Insurance",
      "Wedding Insurance",
      "Event Insurance",
    ],
    aboutText:
      "Travel with peace of mind. Compare travel and lifestyle policies from UK brokers. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers.",
  },
  pet: {
    title: "Pet Insurance",
    description:
      "Compare dog, cat and multi-pet insurance policies to keep your furry friends healthy and protected.",
    heroImage:
      "/images/pet.png",
    subCategories: [
      "Dog Insurance",
      "Cat Insurance",
      "Multi-pet Insurance",
      "Lifetime Cover",
      "Accident-only Cover",
      "Time-limited Cover",
    ],
    aboutText:
      "Find the best pet cover for your dogs and cats. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers.",
  },
  business: {
    title: "Business Insurance",
    description:
      "Compare public liability, professional indemnity and employers' liability policies to protect your business.",
    heroImage:
      "/images/business.png",
    subCategories: [
      "Public Liability",
      "Employers' Liability",
      "Professional Indemnity",
      "Tradesman Insurance",
      "Shop Insurance",
      "Commercial Property",
      "Business Interruption",
    ],
    aboutText:
      "Protect your business and livelihood. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers.",
  },
  specialist: {
    title: "Specialist Insurance",
    description:
      "Compare caravan, motorhome, classic car, modified car, and other specialist vehicle policies.",
    heroImage:
      "/images/specialist.png",
    subCategories: [
      "Caravan Insurance",
      "Motorhome Insurance",
      "Classic Car",
      "Modified Car",
      "Learner Driver",
      "Impounded Car",
      "Gap Insurance",
    ],
    aboutText:
      "Specialist cover for unique vehicles and situations. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers.",
  },
  financial: {
    title: "Financial Protection",
    description:
      "Compare payment protection, mortgage protection, loan protection, and income protection plans.",
    heroImage:
      "/images/financial.png",
    subCategories: [
      "Payment Protection",
      "Mortgage Protection",
      "Loan Protection",
      "Income Protection",
      "Redundancy Cover",
    ],
    aboutText:
      "Protect your income and financial commitments. FindInsurance.co.uk introduces UK consumers to a limited panel of FCA-authorised brokers.",
  },
};

const BROKERS_POOL = [
  {
    name: "Admiral",
    rating: 4.8,
    reviewsCount: 2456,
    fcaNumber: "202153",
    logoBg: "bg-blue-900 text-white font-black italic",
    logoSub: "MULTI-CAR INSURANCE",
    offered: "Third Party Fire & Theft and Comprehensive Cover",
    discount: "Available on 2+ cars",
    discountIcon: <Shield className="w-4 h-4 text-emerald-500 mr-1 inline" />,
    benefit: "Save up to £280* on your policy",
    url: "https://www.admiral.com",
  },
  {
    name: "Tempcover",
    rating: 4.7,
    reviewsCount: 1892,
    fcaNumber: "309855",
    logoBg: "bg-red-50 text-red-600 font-extrabold tracking-widest",
    logoSub: "TEMPORARY COVER",
    offered: "Instant cover from 1 hour to 30 days for cars, vans and more.",
    discount: "Policy in minutes",
    discountIcon: <Zap className="w-4 h-4 text-amber-500 mr-1 inline" />,
    benefit: "Drivers aged 18 - 78",
    url: "https://www.tempcover.com",
  },
  {
    name: "Fair",
    rating: 4.5,
    reviewsCount: 742,
    fcaNumber: "419822",
    logoBg: "bg-blue-800 text-white font-bold",
    logoSub: "INVESTMENT",
    offered: "Flexible learner driver insurance for 1-90 days of practice.",
    discount: "No impact on NCB",
    discountIcon: <GraduationCap className="w-4 h-4 text-blue-500 mr-1 inline" />,
    benefit: "Drivers aged 17 - 22",
    url: "https://www.wearefair.co.uk",
  },
  {
    name: "Avova Insurance",
    rating: 4.9,
    reviewsCount: 3120,
    fcaNumber: "512039",
    logoBg: "bg-indigo-900 text-white font-extrabold italic",
    logoSub: "AVOVA PREMIUM",
    offered: "All-inclusive premium coverage options with 24/7 UK helpline support.",
    discount: "Zero excess options",
    discountIcon: <Shield className="w-4 h-4 text-indigo-500 mr-1 inline" />,
    benefit: "FCA fully regulated protection",
    url: "https://www.avovainsurance.co.uk",
  },
];

export default function DynamicCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.category;

  const categoryInfo = CATEGORY_MAP[slug] || CATEGORY_MAP.motor;

  // Sidebar Filter States
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    categoryInfo.subCategories[0]
  );
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [selectedRating, setSelectedRating] = useState<string>("");

  // Redirection states
  const [redirectingBroker, setRedirectingBroker] = useState<typeof BROKERS_POOL[0] | null>(null);
  const [redirectProgress, setRedirectProgress] = useState<number>(0);

  // Simulate Redirection Progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (redirectingBroker) {
      setRedirectProgress(0);
      interval = setInterval(() => {
        setRedirectProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simulate finished redirect
            setTimeout(() => {
              window.open(redirectingBroker.url, "_blank");
              setRedirectingBroker(null);
            }, 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [redirectingBroker]);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResetFilters = () => {
    setSelectedSubCategory(categoryInfo.subCategories[0]);
    setSortBy("recommended");
    setSelectedRating("");
  };

  return (
    <div className="  ">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-[#0b1b3d] text-white overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 " />
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url('${categoryInfo.heroImage}')` }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
          <div className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mb-2">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>&rsaquo;</span>
              <span className="text-white">{categoryInfo.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              {categoryInfo.title.split(" ")[0]}{" "}
              <span className="text-[#00d66d]">{categoryInfo.title.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
              {categoryInfo.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="bg-[#00d66d] hover:bg-[#00c563] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 text-sm transition-all duration-300 shadow-md shadow-[#00d66d]/15">
                <span>Browse brokers</span>
                <ArrowRight size={16} />
              </button>
              <button className="border border-white/20 hover:bg-white/10 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">
                Explore Insurance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Filters + List */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-6 sticky top-24 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-extrabold text-[#0f265c] text-sm flex items-center gap-1.5">
                    <SlidersHorizontal size={16} className="text-[#00d66d]" />
                    <span>Filters</span>
                  </h3>
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-gray-400 hover:text-[#00d66d] flex items-center gap-1 transition"
                  >
                    <RefreshCw size={10} />
                    <span>Reset All</span>
                  </button>
                </div>

                <form onSubmit={handleApplyFilters} className="space-y-5 text-xs font-semibold">
                  {/* Sub-categories */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                      Sub-Category
                    </label>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {categoryInfo.subCategories.map((sub, i) => (
                        <label
                          key={i}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#00d66d] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="subcategory"
                            checked={selectedSubCategory === sub}
                            onChange={() => setSelectedSubCategory(sub)}
                            className="w-3.5 h-3.5 accent-[#00d66d]"
                          />
                          <span className="text-[11px]">{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                      Sort by
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { label: "Recommended", value: "recommended" },
                        { label: "Most Popular", value: "popular" },
                        { label: "Recently Added", value: "recent" },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#00d66d] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="sort"
                            checked={sortBy === item.value}
                            onChange={() => setSortBy(item.value)}
                            className="w-3.5 h-3.5 accent-[#00d66d]"
                          />
                          <span className="text-[11px]">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                      Minimum Rating
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { label: "4+ Star Rating", value: "4" },
                        { label: "4.5+ Star Rating", value: "4.5" },
                        { label: "5 Star Rating", value: "5" },
                      ].map((rating) => (
                        <label
                          key={rating.value}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#00d66d] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="rating"
                            checked={selectedRating === rating.value}
                            onChange={() => setSelectedRating(rating.value)}
                            className="w-3.5 h-3.5 accent-[#00d66d]"
                          />
                          <span className="text-[11px] flex items-center gap-1">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            {rating.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-center shadow-md transition-colors"
                  >
                    Apply Filters
                  </button>
                </form>
              </div>
            </div>

            {/* Main Listing Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header with Results Count */}
              <div className="flex justify-between items-center bg-white border border-gray-150 p-4 rounded-2xl shadow-sm">
                <span className="text-xs text-gray-500 font-bold">
                  Available Brokers ({BROKERS_POOL.length})
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 font-bold">Sort</span>
                  <select className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-semibold text-[#0f265c] outline-none">
                    <option>Highest Rated</option>
                    <option>Low Fees</option>
                  </select>
                </div>
              </div>

              {/* Brokers List */}
              <div className="space-y-4">
                {BROKERS_POOL.map((broker, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-150 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Logo area */}
                    <div className="flex flex-col items-center justify-center border border-gray-100 rounded-xl p-4 w-full md:w-40 h-24 bg-gray-50 text-center">
                      <div className={`px-3 py-1 rounded text-sm ${broker.logoBg}`}>
                        {broker.name}
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                        {broker.logoSub}
                      </span>
                    </div>

                    {/* Tags & info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 w-full text-left md:px-2">
                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 font-black tracking-wider uppercase">
                          INSURANCE OFFERED
                        </span>
                        <p className="text-xs font-semibold text-[#0f265c] leading-snug">
                          {broker.offered}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 font-black tracking-wider uppercase">
                          SPECIAL OFFERS
                        </span>
                        <p className="text-xs font-semibold text-[#0f265c] leading-snug flex items-center">
                          {broker.discountIcon}
                          {broker.discount}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 font-black tracking-wider uppercase">
                          KEY BENEFIT
                        </span>
                        <p className="text-xs font-semibold text-[#0f265c] leading-snug">
                          {broker.benefit}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full md:w-auto self-stretch md:self-center flex items-center">
                      <button
                        onClick={() => setRedirectingBroker(broker)}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-center transition-colors text-xs shadow-md shadow-blue-600/10 cursor-pointer"
                      >
                        Get Quotes &raquo;
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* About Category Text */}
              <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-3 shadow-sm text-xs leading-relaxed">
                <h3 className="font-extrabold text-[#0f265c] text-sm capitalize">
                  About {categoryInfo.title.toLowerCase()}
                </h3>
                <p className="text-gray-500 leading-relaxed">{categoryInfo.aboutText}</p>
                <p className="text-[10px] text-gray-400">
                  We are not an insurance company and do not provide advice. The broker you connect
                  with is responsible for the products and services they provide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── REDIRECTING LOADING SCREEN OVERLAY ── */}
      {redirectingBroker && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-gray-150 p-8 rounded-3xl w-full max-w-md shadow-xl space-y-6 flex flex-col items-center">
            {/* Logo */}
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
              Redirecting you to {redirectingBroker.name}
            </h3>

            {/* Progress Container */}
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 px-1">
                <span>Verifying your details...</span>
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
              If you are not automatically redirected, please click the button below.
            </p>

            <a
              href={redirectingBroker.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-1.5 text-xs shadow-md transition-colors w-full justify-center"
            >
              <span>Click here</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
