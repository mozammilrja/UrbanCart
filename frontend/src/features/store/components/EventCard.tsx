import Image from "next/image";
import type { StoreEvent } from "@/types/product";

interface EventCardProps {
  event: StoreEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 relative">
        <div className="absolute top-4 left-4 z-20 bg-background-light dark:bg-background-dark px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
          {event.date}
        </div>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h4 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
        {event.title}
      </h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
        {event.description}
      </p>
    </div>
  );
}
