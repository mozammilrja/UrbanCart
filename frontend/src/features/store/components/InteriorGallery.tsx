import Image from "next/image";
import { interiorGallery } from "../services/store.service";

export function InteriorGallery() {
  const altTexts = [
    "Close up of high-end wooden shelving in store",
    "Detail of beige linen fabric texture",
    "Minimalist store rack with monochrome clothes",
    "Architectural staircase inside the retail space",
  ];

  return (
    <section className="mb-24 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {interiorGallery.map((image, index) => (
        <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={altTexts[index]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </section>
  );
}
