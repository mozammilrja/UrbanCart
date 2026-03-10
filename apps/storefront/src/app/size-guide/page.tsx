import type { Metadata } from 'next';
import Image from 'next/image';
import { Ruler, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect fit with our comprehensive size guide',
};

const tshirtSizes = [
  { size: 'S', chest: '38', length: '27', shoulder: '17' },
  { size: 'M', chest: '40', length: '28', shoulder: '18' },
  { size: 'L', chest: '42', length: '29', shoulder: '19' },
  { size: 'XL', chest: '44', length: '30', shoulder: '20' },
  { size: 'XXL', chest: '46', length: '31', shoulder: '21' },
];

const hoodieSizes = [
  { size: 'S', chest: '40', length: '26', shoulder: '18', sleeve: '24' },
  { size: 'M', chest: '42', length: '27', shoulder: '19', sleeve: '25' },
  { size: 'L', chest: '44', length: '28', shoulder: '20', sleeve: '26' },
  { size: 'XL', chest: '46', length: '29', shoulder: '21', sleeve: '27' },
  { size: 'XXL', chest: '48', length: '30', shoulder: '22', sleeve: '28' },
];

const capSizes = [
  { size: 'One Size', circumference: '56-60 cm', depth: '12 cm', brim: '7 cm' },
];

export default function SizeGuidePage() {
  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Size Guide</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Find your perfect fit with our comprehensive measurements
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Fit Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-12">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Our Fit Philosophy</p>
            <p className="text-sm text-amber-700 mt-1">
              APOSTLE garments are designed with a relaxed, oversized silhouette. If you prefer a fitted look, 
              we recommend sizing down. All measurements are in inches unless specified otherwise.
            </p>
          </div>
        </div>

        {/* How to Measure */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-tight mb-6">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <div className="aspect-square relative mb-4 rounded-xl overflow-hidden bg-white">
                <Image
                  src="https://picsum.photos/seed/sizeguide/600/600"
                  alt="How to measure"
                  fill
                  className="object-contain p-8"
                  unoptimized
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Chest</p>
                  <p className="text-sm text-[#666]">
                    Measure around the fullest part of your chest, keeping the tape horizontal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Length</p>
                  <p className="text-sm text-[#666]">
                    Measure from the highest point of the shoulder to the bottom hem.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Shoulder</p>
                  <p className="text-sm text-[#666]">
                    Measure across the back, from one shoulder seam to the other.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  4
                </div>
                <div>
                  <p className="font-medium">Sleeve</p>
                  <p className="text-sm text-[#666]">
                    Measure from the shoulder seam to the end of the cuff.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* T-Shirts */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6" />
            <h2 className="text-2xl font-light tracking-tight">T-Shirts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#111] text-white">
                  <th className="px-6 py-4 text-left text-sm font-medium">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Chest (in)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Length (in)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Shoulder (in)</th>
                </tr>
              </thead>
              <tbody>
                {tshirtSizes.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}>
                    <td className="px-6 py-4 font-medium">{row.size}</td>
                    <td className="px-6 py-4 text-[#666]">{row.chest}</td>
                    <td className="px-6 py-4 text-[#666]">{row.length}</td>
                    <td className="px-6 py-4 text-[#666]">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hoodies */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6" />
            <h2 className="text-2xl font-light tracking-tight">Hoodies & Sweatshirts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#111] text-white">
                  <th className="px-6 py-4 text-left text-sm font-medium">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Chest (in)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Length (in)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Shoulder (in)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                {hoodieSizes.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}>
                    <td className="px-6 py-4 font-medium">{row.size}</td>
                    <td className="px-6 py-4 text-[#666]">{row.chest}</td>
                    <td className="px-6 py-4 text-[#666]">{row.length}</td>
                    <td className="px-6 py-4 text-[#666]">{row.shoulder}</td>
                    <td className="px-6 py-4 text-[#666]">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Caps */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6" />
            <h2 className="text-2xl font-light tracking-tight">Caps</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#111] text-white">
                  <th className="px-6 py-4 text-left text-sm font-medium">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Head Circumference</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Crown Depth</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Brim Length</th>
                </tr>
              </thead>
              <tbody>
                {capSizes.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}>
                    <td className="px-6 py-4 font-medium">{row.size}</td>
                    <td className="px-6 py-4 text-[#666]">{row.circumference}</td>
                    <td className="px-6 py-4 text-[#666]">{row.depth}</td>
                    <td className="px-6 py-4 text-[#666]">{row.brim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#666] mt-4">
            All caps feature an adjustable strap for a customizable fit.
          </p>
        </section>

        {/* Tips */}
        <section className="bg-[#f5f5f5] rounded-2xl p-8">
          <h3 className="text-xl font-light tracking-tight mb-6">Sizing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Between sizes?</p>
              <p className="text-sm text-[#666]">
                If you&apos;re between sizes, we recommend sizing up for a relaxed fit or sizing down for a 
                more fitted look.
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Shrinkage</p>
              <p className="text-sm text-[#666]">
                Our garments are pre-shrunk, but may shrink up to 2% after the first wash. Always follow 
                care instructions.
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Need help?</p>
              <p className="text-sm text-[#666]">
                Our team is happy to help you find the right size. Contact us at{' '}
                <a href="mailto:hello@apostle.in" className="text-[#111] hover:underline">
                  hello@apostle.in
                </a>
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Free exchanges</p>
              <p className="text-sm text-[#666]">
                Not the right fit? We offer free exchanges for different sizes within 7 days of delivery.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
