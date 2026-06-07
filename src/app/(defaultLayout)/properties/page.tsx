"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, RefreshCw } from "lucide-react";
import { useGetPropertiesQuery } from "@/redux/api/propertyApi";
import { Pagination } from "@/components/common/Pagination";
import { PropertyData } from "../../../types";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "most_popular", label: "Most Popular" },
  { value: "recent_added", label: "Recently Added" },
  { value: "highest_rated", label: "Highest Rated" },
  { value: "low_fees", label: "Lowest Fees" },
];

const RATING_OPTIONS = [
  { value: "", label: "Any Rating" },
  { value: "4", label: "4+ Star" },
  { value: "4.5", label: "4.5+ Star" },
  { value: "5", label: "5 Star" },
];

export default function PropertiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedRating, setSelectedRating] = useState("");
  const pageSize = 10;

  const { data, isLoading, error } = useGetPropertiesQuery({
    page: currentPage,
    limit: pageSize,
    sort_by: sortBy,
    rating_4_plus: selectedRating === "4",
    rating_4_5_plus: selectedRating === "4.5",
    rating_5: selectedRating === "5",
  });

  const properties = data?.data?.results ?? [];
  const pagination = data?.data?.pagination;

  const handleReset = () => {
    setSortBy("recommended");
    setSelectedRating("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 rounded-3xl bg-white border border-gray-150 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Compare Insurance Brokers</h1>
              <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                Browse all available property and insurance providers, filter by rating, and get a quick quote from the broker you choose.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 transition"
            >
              <RefreshCw size={16} /> Reset filters
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-xs font-semibold text-slate-500 uppercase">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setCurrentPage(1);
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-green"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-slate-500 uppercase">Minimum rating</span>
              <select
                value={selectedRating}
                onChange={(event) => {
                  setSelectedRating(event.target.value);
                  setCurrentPage(1);
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-green"
              >
                {RATING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Showing {properties.length} brokers
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-3xl bg-white border border-gray-150 p-10 text-center text-slate-500 shadow-sm">Loading properties…</div>
        ) : error ? (
          <div className="rounded-3xl bg-white border border-red-200 p-10 text-center text-red-600 shadow-sm">
            Sorry, we could not load properties right now.
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property: PropertyData) => {
                const imageUrl = property.image || "/images/placeholder.png";
                const label = property.sub_category?.title || property.property_type || "Broker";
                return (
                  <div key={property.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={imageUrl}
                        alt={label}
                        className=" w-[10%] object-cover transition duration-500 group-hover:scale-105"
                      />
                      {property.recommended && (
                        <span className="absolute left-4 top-4 rounded-full bg-brand-green px-3 py-1 text-xs font-bold uppercase text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                          <h2 className="mt-2 text-lg font-bold text-slate-900">{property.title || property.sub_category?.title || property.property_type || "Insurance Broker"}</h2>
                        </div>
                        <div className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {property.rating?.toFixed(1) || "N/A"} <Star className="inline-block h-3.5 w-3.5 text-amber-400" />
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-500 line-clamp-3">
                        {property.description || "Trustworthy insurance brokers with fast quotes and flexible plans."}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Link href={`/properties/${property.id}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          View details
                        </Link>
                        {property.quote_link && (
                          <a
                            href={property.quote_link}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                          >
                            Get quotes
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {pagination && pagination.total_pages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={pagination.current_page}
                  totalPages={pagination.total_pages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}

            {properties.length === 0 && (
              <div className="rounded-3xl bg-white border border-gray-150 p-10 text-center text-slate-500 shadow-sm">
                No insurance providers match your filters. Try a different rating or sort order.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
