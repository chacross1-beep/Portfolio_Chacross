import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CATEGORY_LABELS } from "@/utils/constants";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { copy } from "@/utils/copy";
import { toEmbedVideoUrl } from "@/utils/video-embed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: copy.project.notFound };
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.cover_image ? [{ url: project.cover_image }] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const heroImg = project.hero_image || project.cover_image;
  const gallery = project.gallery || [];
  const palette = project.color_palette || [];

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero banner */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <Image
            src={heroImg}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-premium pb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-blue-400">
              {CATEGORY_LABELS[project.category]}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-semibold text-[#F5F5F5] mt-4">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-[#F5F5F5]/60 max-w-2xl">{project.excerpt}</p>
          </div>
        </section>

        <article className="container-premium py-16 md:py-24 space-y-24">
          {project.overview && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-6 text-[#F5F5F5]">
                {copy.project.overview}
              </h2>
              <p className="text-lg text-[#F5F5F5]/70 leading-relaxed max-w-3xl">
                {project.overview}
              </p>
            </section>
          )}

          {(project.problem || project.solution) && (
            <section className="grid md:grid-cols-2 gap-12">
              {project.problem && (
                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-sm tracking-widest uppercase text-orange-400 mb-4">
                    {copy.project.problem}
                  </h3>
                  <p className="text-[#F5F5F5]/70 leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-sm tracking-widest uppercase text-blue-400 mb-4">
                    {copy.project.solution}
                  </h3>
                  <p className="text-[#F5F5F5]/70 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </section>
          )}

          {project.process && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-6">{copy.project.process}</h2>
              <p className="text-[#F5F5F5]/70 leading-relaxed">{project.process}</p>
            </section>
          )}

          {palette.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-8">{copy.project.colorPalette}</h2>
              <div className="flex flex-wrap gap-4">
                {palette.map((color) => (
                  <div key={color} className="text-center">
                    <div
                      className="w-20 h-20 rounded-xl border border-white/10 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-[#F5F5F5]/50 mt-2 block font-mono">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.typography && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-4">{copy.project.typography}</h2>
              <p className="text-2xl font-heading text-[#F5F5F5]">{project.typography}</p>
            </section>
          )}

          {project.video_url &&
            (() => {
              const videoSrc = toEmbedVideoUrl(project.video_url);
              if (!videoSrc) return null;
              return (
                <section>
                  <h2 className="font-heading text-xl font-semibold mb-8">
                    {copy.project.motionPreview}
                  </h2>
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      src={videoSrc}
                      title={`${project.title} video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </section>
              );
            })()}

          {project.before_image && project.after_image && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-8">{copy.project.beforeAfter}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-3">{copy.project.before}</p>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={project.before_image} alt={copy.project.before} fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-3">{copy.project.after}</p>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={project.after_image} alt={copy.project.after} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {gallery.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-8">{copy.project.gallery}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
            <MagneticButton href="/#portfolio" variant="outline">
              {copy.project.backToWork}
            </MagneticButton>
            <MagneticButton href="/#contact" variant="primary">
              {copy.project.startProject}
            </MagneticButton>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
