"use client";

import React, { useState } from "react";
import { Mail, MapPin, Users, Facebook, Twitter, Instagram, Youtube, Linkedin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    toast.success("Message sent! Our team will get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactCards = [
    {
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      title: "Email",
      description: "Our team is here to help.",
      value: "hello@findinsurance.co.uk",
      bg: "bg-blue-50",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#00d66d]" />,
      title: "Office",
      description: "Visit us at our headquarters.",
      value: "United Kingdom, London HQ",
      bg: "bg-emerald-50",
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "Brokers",
      description: "Partner with us for better reach.",
      value: "partners@findinsurance.co.uk",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#0f265c] py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#00d66d]/10 text-[#00d66d] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
            <Mail size={14} /> Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-black">
            Get in <span className="text-blue-600">touch</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            We're here to help. Note that we are not an insurer — for policy specific questions, please
            contact your broker directly. For all other enquiries, reach out below.
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {contactCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-xl ${card.bg}`}>{card.icon}</div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-400">{card.description}</p>
                    <p className="font-bold text-[#0f265c] text-sm md:text-base">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials & Follow */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-50 hover:bg-[#00d66d] hover:text-black p-2.5 rounded-xl text-gray-600 transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="bg-gray-50 hover:bg-[#00d66d] hover:text-black p-2.5 rounded-xl text-gray-600 transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="bg-gray-50 hover:bg-[#00d66d] hover:text-black p-2.5 rounded-xl text-gray-600 transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="bg-gray-50 hover:bg-[#00d66d] hover:text-black p-2.5 rounded-xl text-gray-600 transition-colors">
                  <Youtube size={16} />
                </a>
                <a href="#" className="bg-gray-50 hover:bg-[#00d66d] hover:text-black p-2.5 rounded-xl text-gray-600 transition-colors">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-150 rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0f265c] focus:outline-none focus:border-[#00d66d] transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0f265c] focus:outline-none focus:border-[#00d66d] transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0f265c] focus:outline-none focus:border-[#00d66d] transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0f265c] focus:outline-none focus:border-[#00d66d] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors duration-300 text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send size={16} />
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
              By submitting you agree to our <a href="#" className="underline">Privacy Policy</a>. We don't provide insurance advice directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
