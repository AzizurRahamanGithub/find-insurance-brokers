"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Bed, Bath, Car, Maximize2, Calendar, Heart, Share2,
  ChevronLeft, ChevronRight, X, Phone, Mail, User, MessageSquare,
  CheckCircle2, Home, Layers, ArrowLeft, DollarSign, Play, Check
} from "lucide-react";
import { useGetPropertyQuery, useAddFavoriteMutation, useRemoveFavoriteMutation, useCreateInquiryMutation } from "@/redux/api/propertyApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = !!token;

  const { data, isLoading, isError } = useGetPropertyQuery(id as string);
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [createInquiry, { isLoading: isSubmitting }] = useCreateInquiryMutation();

  // Gallery state
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [inquirySent, setInquirySent] = useState(false);

  const property = data?.data;

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to save properties!");
      router.push("/login");
      return;
    }
    try {
      if (property?.is_favorite) {
        await removeFavorite(property.id).unwrap();
        toast.success("Removed from favorites");
      } else {
        await addFavorite({ property: property!.id }).unwrap();
        toast.success("Added to favorites ❤️");
      }
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    try {
      await createInquiry({
        property_id: property.id,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone || undefined,
        message: inquiryForm.message,
      }).unwrap();
      setInquirySent(true);
      toast.success("Your inquiry has been sent!");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  const images: string[] =
    property?.images && property.images.length > 0
      ? property.images
      : [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
        ];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="h-[60vh] bg-slate-200 animate-pulse" />
        <div className="container mx-auto px-4 max-w-7xl py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
          <div className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Home size={48} className="mx-auto text-slate-300" />
          <h2 className="text-xl font-bold text-slate-700">Property not found</h2>
          <Link href="/properties" className="text-brand-green font-semibold hover:underline flex items-center gap-1 justify-center">
            <ArrowLeft size={16} /> Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    "For Sale": "bg-emerald-500",
    "For Rent": "bg-blue-500",
    Sold: "bg-red-500",
    Rented: "bg-orange-500",
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── Full-Width Hero Gallery ── */}
      <div className="relative w-full h-[65vh] bg-slate-900 overflow-hidden group">
        <Image
          src={images[activeImage]}
          alt={`${property.title} – image ${activeImage + 1}`}
          fill
          priority
          className="object-cover opacity-90 transition-opacity duration-500"
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

        {/* Nav Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-950/60 border border-white/10 text-white hover:bg-slate-950/90 backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-950/60 border border-white/10 text-white hover:bg-slate-950/90 backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Top Controls */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/10 hover:bg-slate-950/90 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteToggle}
              className={`p-2.5 rounded-full backdrop-blur-sm border transition ${
                property.is_favorite
                  ? "bg-red-500 border-red-400 text-white"
                  : "bg-slate-950/60 border-white/10 text-white hover:bg-slate-950/90"
              }`}
            >
              <Heart size={18} fill={property.is_favorite ? "currentColor" : "none"} />
            </button>
            <button className="p-2.5 rounded-full backdrop-blur-sm border border-white/10 bg-slate-950/60 text-white hover:bg-slate-950/90 transition">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Thumbnails + Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
          <div className="flex items-end justify-between gap-4">
            {/* Property quick stats */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${statusColors[property.status] || "bg-slate-700"}`}>
                  {property.status}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {property.property_type}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg max-w-xl">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <MapPin size={14} />
                <span>{property.address}, {property.location?.name}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 shrink-0">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                      activeImage === idx ? "border-brand-green" : "border-white/20"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
                {images.length > 5 && (
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="w-16 h-12 rounded-lg bg-slate-950/70 border-2 border-white/20 text-white text-xs font-bold flex items-center justify-center"
                  >
                    +{images.length - 5}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-950/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {activeImage + 1} / {images.length}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: Property Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Price + Quick Specs Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-1">Listed Price</div>
                  <div className="text-3xl font-extrabold text-slate-950 tracking-tight flex items-baseline gap-1">
                    <DollarSign size={22} className="text-brand-green" />
                    {Number(property.price).toLocaleString()}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { icon: <Bed size={18} />, label: "Bedrooms", value: property.bedrooms },
                    { icon: <Bath size={18} />, label: "Bathrooms", value: property.bathrooms },
                    { icon: <Car size={18} />, label: "Garages", value: property.garages },
                    { icon: <Maximize2 size={18} />, label: "Area (sqft)", value: property.area },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 space-y-1">
                      <div className="flex justify-center text-brand-green">{spec.icon}</div>
                      <div className="text-sm font-extrabold text-slate-900">{spec.value}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">About This Property</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {property.description || "No description available for this property."}
              </p>

              {/* Additional Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                {[
                  { label: "Property Type", value: property.property_type, icon: <Home size={14} /> },
                  { label: "Status", value: property.status, icon: <Layers size={14} /> },
                  { label: "Year Built", value: property.year_built || "N/A", icon: <Calendar size={14} /> },
                  { label: "Location", value: property.location?.name || "N/A", icon: <MapPin size={14} /> },
                  { label: "Bedrooms", value: `${property.bedrooms} Bed`, icon: <Bed size={14} /> },
                  { label: "Bathrooms", value: `${property.bathrooms} Bath`, icon: <Bath size={14} /> },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="text-slate-400">{item.icon}</span> {item.label}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900">Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5"
                    >
                      <Check size={14} className="text-brand-green shrink-0" />
                      <span className="text-xs font-semibold text-slate-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Tour */}
            {property.video_url && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900">Virtual Tour</h2>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <iframe
                    src={property.video_url}
                    title="Property Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Agent Card + Inquiry Form */}
          <div className="lg:col-span-1 space-y-6">

            {/* Agent Info Card */}
            {property.agent && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Listed By Agent</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-brand-green/30 shrink-0">
                    {property.agent.image && property.agent.image.length > 0 ? (
                      <Image src={property.agent.image[0]} alt={property.agent.full_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-green/20 to-slate-200">
                        <User size={28} className="text-brand-green" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{property.agent.full_name}</div>
                    <div className="text-xs text-slate-500">Verified Agent</div>
                  </div>
                </div>
                <div className="space-y-2.5 pt-1 border-t border-slate-100">
                  {property.agent.phone_number && (
                    <a href={`tel:${property.agent.phone_number}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-green text-sm transition group">
                      <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-brand-green group-hover:bg-brand-green group-hover:text-white transition">
                        <Phone size={14} />
                      </span>
                      {property.agent.phone_number}
                    </a>
                  )}
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-green text-sm transition group">
                    <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-brand-green group-hover:bg-brand-green group-hover:text-white transition">
                      <Mail size={14} />
                    </span>
                    {property.agent.email}
                  </a>
                </div>
              </div>
            )}

            {/* Inquiry Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-brand-green" />
                <h3 className="text-base font-extrabold text-slate-900">Send an Inquiry</h3>
              </div>

              {inquirySent ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center">
                  <div className="p-4 bg-emerald-50 rounded-full">
                    <CheckCircle2 size={36} className="text-emerald-500" />
                  </div>
                  <p className="font-bold text-slate-900">Inquiry Sent!</p>
                  <p className="text-slate-500 text-xs max-w-xs">
                    Our agent will get back to you shortly. Thank you for your interest!
                  </p>
                  <button
                    onClick={() => setInquirySent(false)}
                    className="text-xs text-brand-green font-bold hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-green transition"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-green transition"
                    />
                  </div>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-green transition"
                    />
                  </div>
                  <textarea
                    required
                    rows={4}
                    placeholder={`I'm interested in "${property.title}". Please contact me with more details.`}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-green transition resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 hover:bg-brand-green text-white hover:text-slate-950 font-bold py-3 rounded-xl transition-colors duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>

            {/* Schedule Visit CTA */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-800 rounded-2xl p-6 text-white space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-green">Premium Service</div>
              <h3 className="font-extrabold text-lg">Schedule a Private Viewing</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Explore this property in person with one of our dedicated agents at your convenience.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-green text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl hover:brightness-110 transition"
              >
                <Calendar size={14} /> Book a Visit
              </Link>
            </div>
          </div>
        </div>

        {/* ── Similar Properties Placeholder ── */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-slate-900">You May Also Like</h2>
            <Link href="/properties" className="text-sm text-brand-green font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm">
            Similar property suggestions will appear here once more properties are listed.
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-slate-950/95 backdrop-blur z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={24} />
          </button>
          <div className="relative w-full  h-[80vh] px-16" onClick={(e) => e.stopPropagation()}>
            <Image src={images[activeImage]} alt="" fill className="object-contain" />
            <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
              <ChevronLeft size={28} />
            </button>
            <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {activeImage + 1} / {images.length}
            </div>
          </div>
          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }}
                className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition ${activeImage === idx ? "border-brand-green" : "border-transparent opacity-60"}`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
