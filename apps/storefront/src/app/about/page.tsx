import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description: 'About APOSTLE - Premium Indian Streetwear brand',
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="About APOSTLE"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div className="max-w-2xl px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Premium streetwear for those who dare to stand out
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Section 1 */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              Born from the Streets
            </h2>
            <p className="text-[#777] leading-relaxed">
              APOSTLE was founded with a singular vision: to create premium streetwear that 
              represents the bold, unapologetic spirit of Indian youth culture. We believe 
              that fashion is more than clothing—its a statement of identity.
            </p>
            <p className="text-[#777] leading-relaxed">
              Every piece in our collection is designed in-house and crafted with meticulous 
              attention to detail. From the weight of our fabrics to the precision of our 
              stitching, quality is never compromised.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              Quality First
            </h2>
            <p className="text-[#777] leading-relaxed">
              We source premium materials from trusted suppliers, ensuring every garment 
              meets our exacting standards. Our heavyweight cotton tees, vintage-wash 
              hoodies, and structured caps are built to last—becoming better with every wear.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              Made in India
            </h2>
            <p className="text-[#777] leading-relaxed">
              Were proud to manufacture locally, supporting Indian craftsmanship while 
              maintaining the highest quality standards. Every APOSTLE piece is a testament 
              to what Indian fashion can achieve on the global stage.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#e5e5e5]">
            <div className="text-center">
              <div className="text-4xl font-light mb-2">100%</div>
              <div className="text-xs tracking-widest uppercase text-[#777]">Authentic Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">400gsm</div>
              <div className="text-xs tracking-widest uppercase text-[#777]">Heavyweight Cotton</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">7 Days</div>
              <div className="text-xs tracking-widest uppercase text-[#777]">Easy Returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
