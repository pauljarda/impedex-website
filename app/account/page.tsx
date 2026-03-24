"use client";

import { useEffect, useState } from "react";
import { getCurrentProfile } from "@/lib/get-profile";

type Profile = {
  id: string;
  full_name: string | null;
  role: "customer" | "admin";
  created_at: string;
};

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const data = await getCurrentProfile();
      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f2f2f2] p-8 text-[#041b4a]">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="mt-4">Loading...</p>
      </main>
    );
  }

if (!profile) {
  return (
    <main className="min-h-screen bg-[#f2f2f2] p-8 text-[#041b4a]">
      <h1 className="text-3xl font-bold">My Account</h1>
      <p className="mt-4">
        No profile found. This usually means either you are not logged in,
        or this account does not yet have a row in the profiles table.
      </p>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#f2f2f2] p-8 text-[#041b4a]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-bold">My Account</h1>

        <div className="mt-6 space-y-3 text-sm">
          <p>
            <span className="font-semibold">Full name:</span>{" "}
            {profile.full_name || "-"}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {profile.role}
          </p>
          <p>
            <span className="font-semibold">User ID:</span> {profile.id}
          </p>
          <p>
            <span className="font-semibold">Created at:</span>{" "}
            {new Date(profile.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}