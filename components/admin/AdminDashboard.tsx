"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Project, Testimonial, ProjectCategory } from "@/types";
import { CATEGORY_LABELS } from "@/utils/constants";
import { copy } from "@/utils/copy";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProjectCategory[];

interface Props {
  initialProjects: Project[];
  initialTestimonials: Testimonial[];
}

export function AdminDashboard({ initialProjects, initialTestimonials }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState<"projects" | "testimonials">("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [msg, setMsg] = useState("");

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.slug) return;
    setMsg(copy.admin.saving);
    const payload = {
      slug: editing.slug,
      title: editing.title,
      category: editing.category || "branding",
      excerpt: editing.excerpt || "",
      cover_image: editing.cover_image || "",
      hero_image: editing.hero_image || null,
      video_url: editing.video_url || null,
      overview: editing.overview || null,
      problem: editing.problem || null,
      solution: editing.solution || null,
      process: editing.process || null,
      typography: editing.typography || null,
      featured: editing.featured ?? false,
      sort_order: editing.sort_order ?? 0,
      color_palette: editing.color_palette || [],
      gallery: editing.gallery || [],
    };

    if (editing.id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editing.id);
      if (error) { setMsg(error.message); return; }
      setProjects((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } as Project : p)));
    } else {
      const { data, error } = await supabase.from("projects").insert(payload).select().single();
      if (error) { setMsg(error.message); return; }
      if (data) setProjects((prev) => [...prev, data as Project]);
    }
    setEditing(null);
    setMsg(copy.admin.saved);
    router.refresh();
  };

  const deleteProject = async (id: string) => {
    if (!confirm(copy.admin.deleteProject)) return;
    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setMsg(copy.admin.deleted);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm(copy.admin.deleteConfirm)) return;
    await supabase.from("testimonials").delete().eq("id", id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-sm focus:border-blue-500 outline-none";

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="font-heading text-xl font-bold">{copy.admin.cmsTitle}</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-sm text-white/50 hover:text-white">
            {copy.admin.viewSite}
          </Link>
          <button type="button" onClick={logout} className="text-sm text-red-400">
            {copy.admin.logout}
          </button>
        </div>
      </header>

      <div className="flex gap-4 p-6 border-b border-white/5">
        {(["projects", "testimonials"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm ${
              tab === t ? "bg-blue-600" : "bg-white/5"
            }`}
          >
            {t === "projects" ? copy.admin.projects : copy.admin.testimonials}
          </button>
        ))}
        {msg && <span className="text-sm text-green-400 self-center ml-auto">{msg}</span>}
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-8">
        {tab === "projects" && (
          <>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{copy.admin.projects} ({projects.length})</h2>
                <button
                  type="button"
                  onClick={() => setEditing({ slug: "", title: "", category: "branding" })}
                  className="text-sm px-4 py-2 bg-blue-600 rounded-lg"
                >
                  + {copy.admin.new}
                </button>
              </div>
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="glass-card p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-white/40">{p.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(p)}
                      className="text-xs text-blue-400"
                    >
                      {copy.admin.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProject(p.id)}
                      className="text-xs text-red-400"
                    >
                      {copy.admin.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editing && (
              <form onSubmit={saveProject} className="glass-card p-6 rounded-xl space-y-3 sticky top-6">
                <h3 className="font-bold">{editing.id ? copy.admin.editProject : copy.admin.newProject}</h3>
                {[
                  ["title", copy.admin.fields.title],
                  ["slug", copy.admin.fields.slug],
                  ["excerpt", copy.admin.fields.excerpt],
                  ["cover_image", copy.admin.fields.coverImage],
                  ["hero_image", copy.admin.fields.heroImage],
                  ["video_url", copy.admin.fields.videoUrl],
                  ["overview", copy.admin.fields.overview],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="text-xs text-white/40">{label}</label>
                    <input
                      className={inputClass}
                      value={(editing as Record<string, string>)[key] || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-white/40">{copy.admin.fields.category}</label>
                  <select
                    className={inputClass}
                    value={editing.category || "branding"}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        category: e.target.value as ProjectCategory,
                      })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {CATEGORY_LABELS[c]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2 bg-blue-600 rounded-lg text-sm">
                    {copy.admin.save}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm"
                  >
                    {copy.admin.cancel}
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {tab === "testimonials" && (
          <div className="col-span-2 space-y-4">
            <h2 className="font-bold">Testimonials ({testimonials.length})</h2>
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-card p-4 rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-white/50 mt-1 line-clamp-2">{t.content}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteTestimonial(t.id)}
                  className="text-xs text-red-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
