"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart, MapPin, Bed, Bath, DollarSign, X, Home, LogIn, ArrowRight
} from "lucide-react";
import { useGetFavoritesQuery, useRemoveFavoriteMutation } from "@/redux/api/propertyApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = !!token;

  const { data, isLoading, refetch } = useGetFavoritesQuery(undefined, { skip: !isLoggedIn });
  const [removeFavorite, { isLoading: isRemoving }] = useRemoveFavoriteMutation();

  const favorites: any[] = data?.data || [];

  const handleRemove = async (propertyId: number, propertyTitle: string) => {
    try {
      await removeFavorite(propertyId).unwrap();
      toast.success(`Removed "${propertyTitle}" from favorites`);
      refetch();
    } catch {
      toast.error("Failed to remove. Please try again.");
    }
  };

  // ── Not Logged In State ──
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm max-w-md w-full space-y-5">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <Heart size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Your Saved Properties</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Sign in to your account to view and manage all your saved listings in one place.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-slate-950 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-green hover:text-slate-950 transition-colors text-sm"
          >
            <LogIn size={16} /> Sign In to View Favorites
          </Link>
        </div>
      </div>
    );
  }

  // ── Loading State ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-4 ">
          <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Heart size={28} className="text-red-400" fill="currentColor" />
              Saved Properties
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {favorites.length === 0
                ? "You haven't saved any properties yet."
                : `${favorites.length} propert${favorites.length !== 1 ? "ies" : "y"} saved`}
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-slate-950 text-white hover:bg-brand-green hover:text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            Browse Properties <ArrowRight size={16} />
          </Link>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl py-20 text-center space-y-5">
            <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center mx-auto">
              <Home size={36} className="text-slate-300" />
            </div>
            <div>
              <p className="text-slate-700 font-bold text-lg">No saved listings yet</p>
              <p className="text-slate-500 text-sm mt-1">
                Click the ♥ icon on any property to save it here.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-brand-green text-slate-950 font-bold px-6 py-3 rounded-xl hover:brightness-105 transition text-sm"
            >
              Start Exploring <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav: any) => {
              // The favorite object may wrap property data, handle both shapes
              const prop = fav.property || fav;
              const thumbImage =
                prop.images && prop.images.length > 0
                  ? prop.images[0]
                  : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80";

              return (
                <div
                  key={fav.id || prop.id}
                  className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group relative flex flex-col"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(prop.id, prop.title)}
                    disabled={isRemoving}
                    title="Remove from favorites"
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>

                  {/* Image */}
                  <Link href={`/properties/${prop.id}`} className="relative h-48 block overflow-hidden bg-slate-100">
                    <Image
                      src={thumbImage}
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    {/* Status badge */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase backdrop-blur-sm">
                        {prop.status}
                      </span>
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                        <MapPin size={10} />
                        <span className="line-clamp-1">{prop.address}, {prop.location?.name}</span>
                      </div>
                      <Link href={`/properties/${prop.id}`}>
                        <h3 className="font-extrabold text-slate-900 text-sm hover:text-brand-green transition-colors line-clamp-1">
                          {prop.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Specs Strip */}
                    <div className="grid grid-cols-3 gap-1 border-y border-slate-100 py-2.5 text-slate-500 text-[10px] font-semibold text-center">
                      <span className="flex items-center justify-center gap-1">
                        <Bed size={10} /> {prop.bedrooms}
                      </span>
                      <span className="flex items-center justify-center gap-1">
                        <Bath size={10} /> {prop.bathrooms}
                      </span>
                      <span>{prop.area} sqft</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="font-extrabold text-slate-950 text-base flex items-center">
                        <DollarSign size={14} className="-mr-0.5 text-brand-green" />
                        {Number(prop.price).toLocaleString()}
                      </div>
                      <Link
                        href={`/properties/${prop.id}`}
                        className="bg-slate-950 hover:bg-brand-green hover:text-slate-950 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
