"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { copy } from "@/utils/copy";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError(copy.admin.configureSupabase);
      return;
    }
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setError(authError.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md glass-card p-10 rounded-2xl space-y-6"
      >
        <h1 className="font-heading text-2xl font-bold">{copy.admin.title}</h1>
        <p className="text-sm text-white/50">{copy.admin.portfolio}</p>
        <input
          type="email"
          placeholder={copy.admin.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#111] border border-white/10 focus:border-blue-500 outline-none"
          required
        />
        <input
          type="password"
          placeholder={copy.admin.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#111] border border-white/10 focus:border-blue-500 outline-none"
          required
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
        >
          {copy.admin.signIn}
        </button>
      </form>
    </div>
  );
}
