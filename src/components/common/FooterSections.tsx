"use client";

import React from "react";
import Link from "next/link";
import { useGetSubCategoriesQuery } from "@/redux/api/propertyApi";
import { SubCategoryData } from "@/types";

export default function FooterSections() {
  const { data, isLoading } = useGetSubCategoriesQuery();

  if (isLoading) return null;

  const results = data?.data?.results || [];

  // property_type অনুযায়ী group করা
  const grouped = results.reduce((acc, item: SubCategoryData) => {
    if (!acc[item.property_type]) {
      acc[item.property_type] = [];
    }
    acc[item.property_type].push(item);
    return acc;
  }, {} as Record<string, SubCategoryData[]>);

  return (
    <div className="bg-[#050f24] text-gray-400 text-sm border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {Object.entries(grouped).map(([propertyType, subCategories]) => (
            <div key={propertyType} className="space-y-4">
              <h4 className="text-white font-semibold text-[20px] tracking-wide border-b border-gray-800 pb-2">
                {propertyType}
              </h4>
              <ul className="space-y-2 text-[18px] leading-tight">
                {subCategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={sub.quote_link || "#"}
                      className="hover:text-[#00d66d] transition-colors"
                    >
                      {sub.title}
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