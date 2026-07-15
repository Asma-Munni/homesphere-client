"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const role = String(
    session?.user?.role ?? "tenant"
  );

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    if (role === "admin") {
      router.replace(
        "/dashboard/admin"
      );
      return;
    }

    if (
      role === "property-holder"
    ) {
      router.replace(
        "/dashboard/holder"
      );
      return;
    }

    router.replace(
      "/dashboard/tenant"
    );
  }, [
    isPending,
    session?.user,
    role,
    router,
  ]);

  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

        <p className="mt-4 font-medium text-slate-600">
          Redirecting to your
          dashboard...
        </p>
      </div>
    </main>
  );
}