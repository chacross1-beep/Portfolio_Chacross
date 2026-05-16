import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      {children}
    </div>
  );
}
