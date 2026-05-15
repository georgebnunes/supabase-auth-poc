import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/sign-out-button";
import { User, Sparkles, ShieldCheck } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#030303] px-4 selection:bg-white/10 text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="h-full w-full text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            You're securely <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">logged in</span>.
          </h1>
          <p className="max-w-md text-lg text-white/50">
            Welcome to your protected dashboard. Your session is managed by Supabase Auth with Google SSO.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-3xl shadow-2xl">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {user.user_metadata.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-white/10"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/10 bg-white/5">
                  <User className="h-12 w-12 text-white/20" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 border-4 border-[#030303]" title="Online" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{user.user_metadata.full_name || 'Anonymous User'}</h2>
              <p className="text-sm text-white/40">{user.email}</p>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60">
                ID: {user.id.slice(0, 8)}...
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60">
                Last sign-in: {new Date(user.last_sign_in_at!).toLocaleDateString()}
              </div>
            </div>

            <SignOutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
          <a
            href="https://supabase.com/docs"
            target="_blank"
            className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white/90">Supabase Docs</h3>
            <p className="text-xs text-white/40">Learn more about authentication and database features.</p>
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            className="group flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Image src="/next.svg" alt="Next.js" width={16} height={16} className="invert" />
            </div>
            <h3 className="font-semibold text-white/90">Next.js Docs</h3>
            <p className="text-xs text-white/40">Master the App Router and server-side features.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
