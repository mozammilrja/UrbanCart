import Image from "next/image";
import Link from "next/link";
import { editorialSection } from "../services/landing.service";

export function EditorialSection() {
  return (
    <section className="px-4 md:px-10 py-20">
      <div className="relative h-[600px] rounded-xl overflow-hidden group">
        <Image
          src={editorialSection.image}
          alt="Editorial lifestyle fashion shot"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h4 className="text-4xl font-bold mb-4">{editorialSection.title}</h4>
          <p className="max-w-md text-white/80 mb-6">{editorialSection.description}</p>
          <Link
            href="/journal"
            className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm group/btn"
          >
            {editorialSection.cta}{" "}
            <span className="material-symbols-outlined group-hover/btn:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
