import Image from "next/image";
import { editorialPortrait } from "../services/about.service";

export function EditorialPortrait() {
  return (
    <section className="px-6 lg:px-20 pb-24">
      <div className="aspect-[21/9] w-full overflow-hidden rounded-xl bg-primary/10 relative">
        <Image
          src={editorialPortrait.image}
          alt="Editorial wide shot of a master tailor working in a sunlit minimal studio"
          fill
          className="object-cover opacity-90"
          sizes="100vw"
          priority
        />
        <div className="absolute bottom-10 left-10 text-white max-w-sm">
          <span className="text-xs uppercase tracking-[0.3em] font-bold mb-2 block">
            {editorialPortrait.established}
          </span>
          <p className="text-sm font-medium italic opacity-80">
            {editorialPortrait.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
