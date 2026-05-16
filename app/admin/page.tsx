import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { copy } from "@/utils/copy";

export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div>
          <h1 className="font-heading text-2xl font-bold mb-4">{copy.admin.title}</h1>
          <p className="text-white/50 max-w-md">
            {copy.admin.setupHint}{" "}
            <a href="/admin/login" className="text-blue-400 underline">
              /admin/login
            </a>
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order");

  return (
    <AdminDashboard
      initialProjects={projects ?? []}
      initialTestimonials={testimonials ?? []}
    />
  );
}
