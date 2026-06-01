"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PropertiesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-gray-500 text-sm">Redirecting to FindInsurance comparison categories...</p>
    </div>
  );
}
