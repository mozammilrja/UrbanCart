'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Share2,
  Instagram,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { products } from '@/data/mock';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';

// The 12 Stages as Fashion - Using dark streetwear product images
const twelveStages = [
  {
    id: 1,
    name: 'The Judas',
    description: 'The betrayal within — of others and oneself.',
    elements: 'torn seams, silver chains, cross motifs, reversible garments symbolising duality.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
  },
  {
    id: 2,
    name: 'The Denial',
    description: 'Refusing to acknowledge truth — the mask we wear.',
    elements: 'hidden pockets, inverted logos, distorted prints, double-layered construction.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
  },
  {
    id: 3,
    name: 'The Fall',
    description: 'The descent into darkness — hitting rock bottom.',
    elements: 'deconstructed hems, asymmetric cuts, gradient fades to black.',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
  },
  {
    id: 4,
    name: 'The Isolation',
    description: 'Standing alone — separated from the world.',
    elements: 'oversized silhouettes, monochrome palettes, minimal detailing.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  },
  {
    id: 5,
    name: 'The Rage',
    description: 'Explosive anger — raw emotion unleashed.',
    elements: 'bold red accents, aggressive graphics, distressed textures.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
  },
  {
    id: 6,
    name: 'The Surrender',
    description: 'Letting go — accepting what cannot be changed.',
    elements: 'flowing fabrics, neutral tones, soft draping, open constructions.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
  },
  {
    id: 7,
    name: 'The Reflection',
    description: 'Looking inward — confronting the self.',
    elements: 'mirror-like finishes, symmetrical designs, reflective materials.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
  },
  {
    id: 8,
    name: 'The Rebirth',
    description: 'Emerging anew — transformed and renewed.',
    elements: 'butterfly motifs, white accents, clean lines, breathable fabrics.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  },
  {
    id: 9,
    name: 'The Awakening',
    description: 'Eyes opened — seeing clearly for the first time.',
    elements: 'eye graphics, sunrise gradients, contrast stitching.',
    image: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&q=80',
  },
  {
    id: 10,
    name: 'The Purpose',
    description: 'Finding meaning — understanding the mission.',
    elements: 'structured shoulders, defined silhouettes, bold typography.',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
  },
  {
    id: 11,
    name: 'The Strength',
    description: 'Standing firm — unshakeable resolve.',
    elements: 'reinforced construction, armor-like details, metallic hardware.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
  },
  {
    id: 12,
    name: 'The Ascension',
    description: 'Rising above — transcending limitations.',
    elements: 'cloud-like textures, ethereal whites, floating silhouettes.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  },
];

// Chapter data
const chapters = [
  {
    id: 1,
    number: '01',
    title: 'The Judas',
    subtitle: 'Betrayal Within',
    description: 'The first chapter explores the duality of self — the betrayal within and the masks we wear. Torn seams and silver chains define this collection.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80',
    color: 'from-zinc-800 to-zinc-900',
    year: '2023',
    quote: '"The greatest betrayal begins with self."',
    stats: { pieces: 12, drops: 1, cities: 3 }
  },
  {
    id: 2,
    number: '02',
    title: 'The Denial',
    subtitle: 'Refusing Truth',
    description: 'Hidden pockets, inverted logos, and double-layered construction — denying what we know to be true.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80',
    color: 'from-slate-800 to-slate-900',
    year: '2023',
    quote: '"We hide from ourselves before we hide from others."',
    stats: { pieces: 15, drops: 1, cities: 4 }
  },
  {
    id: 3,
    number: '03',
    title: 'The Fall',
    subtitle: 'Into Darkness',
    description: 'The descent begins. Deconstructed hems, asymmetric cuts, and gradient fades to black mark this era.',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80',
    color: 'from-neutral-900 to-black',
    year: '2023',
    quote: '"Rock bottom is where foundations are built."',
    stats: { pieces: 18, drops: 2, cities: 5 }
  },
  {
    id: 4,
    number: '04',
    title: 'The Isolation',
    subtitle: 'Standing Alone',
    description: 'Oversized silhouettes and monochrome palettes for those who walk their own path, separated from the noise.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80',
    color: 'from-gray-900 to-gray-950',
    year: '2024',
    quote: '"In solitude, we find our true voice."',
    stats: { pieces: 20, drops: 2, cities: 6 }
  },
  {
    id: 5,
    number: '05',
    title: 'The Rage',
    subtitle: 'Unleashed Fury',
    description: 'Bold accents, aggressive graphics, and distressed textures. Raw emotion unleashed through fabric.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80',
    color: 'from-red-950 to-black',
    year: '2024',
    quote: '"Anger is energy waiting to be channeled."',
    stats: { pieces: 24, drops: 3, cities: 7 }
  },
  {
    id: 6,
    number: '06',
    title: 'The Surrender',
    subtitle: 'Letting Go',
    description: 'Flowing fabrics, neutral tones, and soft draping. Accepting what cannot be changed.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80',
    color: 'from-stone-800 to-stone-900',
    year: '2024',
    quote: '"Surrender is not weakness — it is wisdom."',
    stats: { pieces: 22, drops: 2, cities: 8 }
  },
  {
    id: 7,
    number: '07',
    title: 'The Reflection',
    subtitle: 'Looking Inward',
    description: 'Mirror-like finishes and symmetrical designs. Confronting the self in every stitch.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=80',
    color: 'from-zinc-800 to-zinc-950',
    year: '2024',
    quote: '"The mirror shows what we choose to see."',
    stats: { pieces: 26, drops: 3, cities: 9 }
  },
  {
    id: 8,
    number: '08',
    title: 'The Rebirth',
    subtitle: 'Emerging Anew',
    description: 'White accents on black canvas. Clean lines and breathable fabrics for the transformed self.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
    color: 'from-neutral-800 to-neutral-950',
    year: '2025',
    quote: '"From ashes, we rise renewed."',
    stats: { pieces: 30, drops: 3, cities: 10 }
  },
  {
    id: 9,
    number: '09',
    title: 'The Awakening',
    subtitle: 'Eyes Opened',
    description: 'Seeing clearly for the first time. Contrast stitching and bold statements define this moment.',
    image: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=1200&q=80',
    color: 'from-amber-950 to-black',
    year: '2025',
    quote: '"Awakening is not a moment — it is a commitment."',
    stats: { pieces: 32, drops: 4, cities: 11 }
  },
  {
    id: 10,
    number: '10',
    title: 'The Purpose',
    subtitle: 'Finding Meaning',
    description: 'Structured shoulders and defined silhouettes. Every piece tells a story of intention.',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1200&q=80',
    color: 'from-indigo-950 to-black',
    year: '2025',
    quote: '"Purpose is the compass through chaos."',
    stats: { pieces: 36, drops: 4, cities: 12 }
  },
  {
    id: 11,
    number: '11',
    title: 'The Strength',
    subtitle: 'Unshakeable Resolve',
    description: 'Reinforced construction and armor-like details. Built for those who stand firm.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=80',
    color: 'from-emerald-950 to-black',
    year: '2026',
    quote: '"Strength is not loud — it is unwavering."',
    stats: { pieces: 40, drops: 5, cities: 15 }
  },
  {
    id: 12,
    number: '12',
    title: 'The Ascension',
    subtitle: 'Rising Above',
    description: 'Ethereal whites and floating silhouettes. The final stage — transcending all limitations.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    color: 'from-violet-950 to-black',
    year: '2026',
    quote: '"The future belongs to those who dare to ascend."',
    stats: { pieces: '??', drops: '??', cities: '??' }
  }
];

// Featured products from chapters
const featuredProducts = products.slice(0, 4);

// Events/milestones
const milestones = [
  { date: 'Jan 2023', event: 'APOSTLE Founded', iconType: 'star' },
  { date: 'Mar 2023', event: 'Chapter 01: The Judas', iconType: 'sparkles' },
  { date: 'Jun 2023', event: 'Chapter 02-03 Drop', iconType: 'sparkles' },
  { date: 'Sep 2023', event: 'Delhi Pop-up Store', iconType: 'mappin' },
  { date: 'Jan 2024', event: 'Chapter 04-06 Released', iconType: 'sparkles' },
  { date: 'Jun 2024', event: 'Chapter 07-08: The Rebirth Era', iconType: 'star' },
  { date: 'Oct 2024', event: '25,000 Community Members', iconType: 'users' },
  { date: 'Jan 2025', event: 'Chapter 09-10 Launch', iconType: 'sparkles' },
  { date: 'Jun 2025', event: 'International Shipping Launch', iconType: 'arrow' },
  { date: 'Jan 2026', event: 'Chapter 11: The Strength', iconType: 'star' },
  { date: 'Mar 2026', event: 'Chapter 12: The Ascension Begins', iconType: 'star' },
];

// Fabric types
const fabricTypes = [
  { 
    name: 'Heavyweight Cotton', 
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    description: 'Premium 300 GSM cotton for exceptional durability'
  },
  { 
    name: 'Woolen & Polyester Blend', 
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    description: 'Soft wool with polyester for added durability'
  },
  { 
    name: 'French Terry', 
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    description: 'Looped back fabric for comfort and warmth'
  },
  { 
    name: 'Cotton & Polyester Blend', 
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    description: 'Perfect balance of comfort and resilience'
  },
  { 
    name: 'Pure Denim', 
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    description: 'Classic denim with vintage wash aesthetics'
  },
];

// Clothing categories
const clothingCategories = {
  menswear: ['Hoodies', 'Jeans', 'Jackets', 'Shirt'],
  womenswear: ['Hoodies', 'Jeans', 'Sweaters', 'Tops', 'Bottom wear'],
  unisex: ['Hoodies', 'Compressions', 'Jackets', 'T shirt'],
};

// Craftsmanship details
const craftDetails = [
  'Hand-picked fabrics.',
  'Premium stitching & finishing.',
  'Every piece undergoes quality checks for perfection.',
];

function MilestoneIcon({ type }: { type: string }) {
  switch (type) {
    case 'star':
      return <Star className="w-5 h-5 text-white" />;
    case 'sparkles':
      return <Sparkles className="w-5 h-5 text-white" />;
    case 'mappin':
      return <MapPin className="w-5 h-5 text-white" />;
    case 'users':
      return <Users className="w-5 h-5 text-white" />;
    case 'arrow':
      return <ArrowRight className="w-5 h-5 text-white" />;
    default:
      return <Star className="w-5 h-5 text-white" />;
  }
}

export default function ChapterPage() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentChapter = chapters[activeChapter];
  const currentStage = twelveStages[activeStage];

  const nextStage = () => {
    setActiveStage((prev) => (prev + 1) % twelveStages.length);
  };

  const prevStage = () => {
    setActiveStage((prev) => (prev - 1 + twelveStages.length) % twelveStages.length);
  };

  const nextChapter = () => {
    setActiveChapter((prev) => (prev + 1) % chapters.length);
  };

  const prevChapter = () => {
    setActiveChapter((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  return (
    <div className="min-h-screen bg-[#111]">
      {/* Hero Section - Full Screen Chapter Viewer */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={currentChapter.image}
            alt={currentChapter.title}
            fill
            className="object-cover transition-all duration-1000"
            priority
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-80 transition-all duration-1000",
            currentChapter.color
          )} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-[#111]/50 pointer-events-none" />
          {/* Top gradient for navbar visibility */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
          <div className="max-w-3xl">
            {/* Chapter Number */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white/40 text-sm font-medium tracking-widest uppercase">Chapter</span>
              <span className="text-8xl md:text-[150px] font-bold text-white/10 leading-none">
                {currentChapter.number}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4">
              {currentChapter.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-6">
              {currentChapter.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              {currentChapter.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mb-10">
              <div>
                <p className="text-3xl font-bold text-white">{currentChapter.stats.pieces}</p>
                <p className="text-sm text-white/50">Pieces</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-white">{currentChapter.stats.drops}</p>
                <p className="text-sm text-white/50">Drops</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-white">{currentChapter.stats.cities}</p>
                <p className="text-sm text-white/50">Cities</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/collections/${currentChapter.title.toLowerCase()}`}
                className="group inline-flex items-center gap-3 bg-white text-[#111] px-8 py-4 font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105"
              >
                Shop This Chapter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="p-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quote */}
          <div className="absolute bottom-24 right-8 md:right-16 max-w-md hidden lg:block">
            <p className="text-xl text-white/80 italic">
              {currentChapter.quote}
            </p>
            <p className="text-white/50 mt-2">— APOSTLE, {currentChapter.year}</p>
          </div>

          {/* Chapter Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={prevChapter}
              className="p-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Chapter Indicators */}
            <div className="flex items-center gap-1.5">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(index)}
                  className={cn(
                    "transition-all rounded-full",
                    index === activeChapter
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>

            <button
              onClick={nextChapter}
              className="p-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Year Badge - positioned below navbar */}
          <div className="absolute top-24 md:top-28 right-4 md:right-16">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <MapPin className="w-4 h-4 text-white/70" />
              <Calendar className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white font-medium">{currentChapter.year}</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest rotate-90 origin-center translate-y-8">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-white/50 uppercase tracking-widest">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">The Timeline</h2>
          </div>

          {/* Timeline - Clean Vertical Layout */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/5 via-white/20 to-white/5" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.event}
                  className={cn(
                    "relative flex items-start gap-6 md:gap-0",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full ring-4 ring-[#111] z-10" />
                  
                  {/* Content Card */}
                  <div className={cn(
                    "ml-14 md:ml-0 md:w-[calc(50%-40px)] bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all",
                    index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
                  )}>
                    <div className={cn(
                      "flex items-center gap-4 mb-3",
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    )}>
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MilestoneIcon type={milestone.iconType} />
                      </div>
                      <span className="text-sm text-white/50 font-medium">{milestone.date}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{milestone.event}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE 12 STAGES AS FASHION */}
      <section className="relative py-20 md:py-32 bg-black overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-zinc-900/50 via-zinc-800/30 to-zinc-900/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white uppercase tracking-[0.2em]">
              The 12 Stages as Fashion
            </h2>
          </div>

          {/* Stage Viewer */}
          <div className="relative">
            {/* Current Stage */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Stage Name Button */}
              <div className="lg:w-1/4 text-center lg:text-right order-1 lg:order-1">
                <div className="inline-flex items-center gap-4">
                  <span className="text-5xl md:text-6xl font-bold text-white/10">{String(activeStage + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block bg-white text-black px-6 py-3 rounded-full">
                    <span className="text-base md:text-lg font-medium">{currentStage.name}</span>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="lg:w-2/4 flex justify-center order-2 lg:order-2">
                <div className="relative w-72 h-80 md:w-[350px] md:h-[420px] lg:w-[400px] lg:h-[480px]">
                  <Image
                    src={currentStage.image}
                    alt={currentStage.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="lg:w-1/4 text-center lg:text-left space-y-4 order-3 lg:order-3">
                <p className="text-lg md:text-xl text-white/90 italic leading-relaxed">
                  {currentStage.description}
                </p>
                <div className="pt-2">
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Elements</p>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {currentStage.elements}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prevStage}
                className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label="Previous stage"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                {[...Array(12)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStage(index)}
                    className={cn(
                      "transition-all duration-300",
                      index === activeStage
                        ? "w-8 h-2 bg-white rounded-full"
                        : "w-2 h-2 bg-white/30 rounded-full hover:bg-white/50"
                    )}
                    aria-label={`Go to stage ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextStage}
                className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label="Next stage"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Style Segment Section */}
      <section className="relative py-32 md:py-40 overflow-hidden bg-black">
        {/* Subtle gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-3xl md:text-4xl lg:text-5xl text-white/20 font-light tracking-[0.3em] uppercase">
            Style Segment
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mt-6 tracking-tight">
            STREETWEAR
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium mt-8">
            Inspired by Emotions. Built for Your Moments.
          </p>
          <p className="text-base md:text-lg text-white/60 mt-8 max-w-2xl mx-auto leading-relaxed">
            Streetwear at Apostle is not just clothing – <span className="text-white/90 italic">it's a reflection of moods and memories</span>. 
            Oversized fits and bold cuts that move with you, whether it's late-night drives, rooftop conversations, or city chaos.
          </p>
        </div>
      </section>

      {/* Fabrics Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-[0.1em] uppercase">
              Fabrics Apostle Will Be Making
            </h2>
          </div>

          {/* Large Scissors Image */}
          <div className="relative h-64 md:h-80 lg:h-96 mb-16 overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1400&q=80"
              alt="Craftsmanship - Scissors"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Fabric Collage Grid - Matching PDF Layout */}
          <div className="relative h-auto md:h-[600px] lg:h-[700px]">
            {/* Desktop Collage Layout */}
            <div className="hidden md:grid md:grid-cols-12 md:grid-rows-6 gap-3 h-full">
              {/* Heavyweight Cotton - Top Left */}
              <div className="col-span-4 row-span-3 relative group">
                <Image
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
                  alt="Heavyweight Cotton"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Heavyweight</h3>
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Cotton</h3>
                </div>
              </div>

              {/* Woolen & Polyester Blend - Top Center */}
              <div className="col-span-4 row-span-3 relative group">
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80"
                  alt="Woolen & Polyester Blend"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60" />
                <div className="absolute top-6 right-6 text-right">
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Woolen & Polyester</h3>
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Blend</h3>
                </div>
              </div>

              {/* French Terry - Top Right */}
              <div className="col-span-4 row-span-3 relative group">
                <Image
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80"
                  alt="French Terry"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60" />
                <div className="absolute top-6 right-6 text-right">
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">French</h3>
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Terry</h3>
                </div>
              </div>

              {/* Cotton & Polyester Blend - Bottom Left */}
              <div className="col-span-6 row-span-3 relative group">
                <Image
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"
                  alt="Cotton & Polyester Blend"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Cotton & Polyester</h3>
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Blend</h3>
                </div>
              </div>

              {/* Pure Denim - Bottom Right */}
              <div className="col-span-6 row-span-3 relative group">
                <Image
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80"
                  alt="Pure Denim"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60" />
                <div className="absolute bottom-6 right-6 text-right">
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Pure</h3>
                  <h3 className="text-lg font-light text-white uppercase tracking-wider">Denim</h3>
                </div>
              </div>
            </div>

            {/* Mobile Grid */}
            <div className="grid md:hidden grid-cols-2 gap-3">
              {fabricTypes.map((fabric) => (
                <div 
                  key={fabric.name}
                  className="group relative aspect-square overflow-hidden"
                >
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/60" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/60" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-sm font-light text-white uppercase tracking-wider">
                      {fabric.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Fashion - 12 Stages */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-zinc-950">
        {/* Subtle background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-[0.1em] uppercase">
            Other Fashion Than 12 Stages
          </h2>
          <div className="mt-8 inline-flex items-center gap-4">
            <span className="text-lg md:text-xl text-white/50 uppercase tracking-[0.2em]">Category</span>
            <span className="w-12 h-px bg-white/30" />
            <span className="text-xl md:text-2xl text-white font-semibold uppercase tracking-wider">Streetwear</span>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Product - Wool Jacket */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
            <div className="flex-1 relative flex justify-center">
              <div className="relative w-80 h-96 md:w-[450px] md:h-[550px]">
                <Image
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
                  alt="Wool Jacket with cross detail"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left max-w-md">
              <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed">
                Soft wool ensures comfort, while polyester adds durability.
              </p>
            </div>
          </div>

          {/* Featured Product - Denim */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-32">
            <div className="flex-1 relative flex justify-center">
              <div className="relative w-80 h-96 md:w-[450px] md:h-[550px]">
                <Image
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
                  alt="Denim Pants"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-right max-w-md ml-auto">
              <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed">
                A canvas of rebellion and individuality, designed to move with you. Strong, structured, and crafted for bold expression.
              </p>
            </div>
          </div>

          {/* Featured Product - T-shirt */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
            <div className="flex-1 relative flex justify-center">
              <div className="relative w-80 h-96 md:w-[450px] md:h-[550px]">
                <Image
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
                  alt="APOSTLE T-shirt"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left max-w-md">
              <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed">
                Strong-threaded structure that keeps its form through wear, motion, and time.
              </p>
            </div>
          </div>

          {/* Featured Products - Front and Back Design */}
          <div className="text-center mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-12">
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80"
                  alt="T-shirt Front - Chain graphic"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80"
                  alt="T-shirt Back - Artwork"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-white/80 italic max-w-3xl mx-auto leading-relaxed">
              Front chain graphic symbolizing restraint and release. Detailed back artwork representing transformation and identity.
            </p>
          </div>
        </div>
      </section>

      {/* Label Idea Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white/30 uppercase tracking-[0.1em] mb-16">
            Label Idea
          </h2>
          
          {/* T-shirt Collar with Label */}
          <div className="relative max-w-lg mx-auto">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900">
              <Image
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
                alt="T-shirt collar with label"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/60" />
              
              {/* Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white text-black px-8 py-6 shadow-2xl transform rotate-0">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-4">
                    Rebellion Is Purity
                  </h3>
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-600 border-t border-gray-300 pt-4">
                    <span className="flex gap-1">
                      <span>✖</span>
                      <span>⚡</span>
                      <span>⬡</span>
                      <span>▣</span>
                    </span>
                    <span className="text-gray-400">|</span>
                    <span>MADE IN INDIA</span>
                    <span className="text-gray-400">|</span>
                    <span>100% COTTON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clothing Category Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80"
            alt="Fashion Background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white text-center uppercase tracking-[0.1em] mb-16">
            Clothing Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Menswear */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-8">Menswear</h3>
              <div className="space-y-4">
                {clothingCategories.menswear.map((item) => (
                  <Link
                    key={item}
                    href={`/collections/${item.toLowerCase()}`}
                    className="block py-3 px-6 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Womenswear */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-8">Womenswear</h3>
              <div className="space-y-4">
                {clothingCategories.womenswear.map((item) => (
                  <Link
                    key={item}
                    href={`/collections/${item.toLowerCase().replace(' ', '-')}`}
                    className="block py-3 px-6 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Unisex */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-8">Unisex</h3>
              <div className="space-y-4">
                {clothingCategories.unisex.map((item) => (
                  <Link
                    key={item}
                    href={`/collections/${item.toLowerCase().replace(' ', '-')}`}
                    className="block py-3 px-6 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Detailing Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-zinc-950">
        {/* Artistic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80"
              alt="Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-sm text-white/40 uppercase tracking-[0.3em]">Quality First</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white uppercase tracking-[0.15em] mt-4">
            Craftsmanship & Detailing
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-8 mb-12">
            IT'S IN THE DETAILS
          </h3>

          <div className="space-y-4 max-w-2xl mx-auto">
            {craftDetails.map((detail, index) => (
              <p key={index} className="text-lg md:text-xl text-white/70 italic">
                {detail}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Grid */}
      <section className="py-20 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-white/50 uppercase tracking-widest">The Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">All 12 Chapters</h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">Each chapter represents a stage of transformation — from betrayal to ascension, every piece tells a story.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapter(index);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn(
                  "group relative aspect-[3/4] rounded-2xl overflow-hidden text-left",
                  activeChapter === index && "ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]"
                )}
              >
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-b opacity-80 group-hover:opacity-90 transition-opacity",
                  chapter.color
                )} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-medium mb-1 uppercase tracking-wider">Chapter {chapter.number}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{chapter.title}</h3>
                  <p className="text-white/70 text-sm">{chapter.subtitle}</p>
                  
                  <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">View</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-[#111]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm text-white/50 uppercase tracking-widest">From The Chapters</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured Pieces</h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {mounted && featuredProducts.map((product, index) => (
              <OptimizedProductCard 
                key={product._id}
                product={product}
                index={index}
                priority={index < 4}
              />
            ))}
            {!mounted && featuredProducts.map((product) => (
              <div key={product._id} className="aspect-[3/4] bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        {/* Decorative smoke/wave effect */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
            <path
              fill="currentColor"
              d="M40,80 Q60,40 100,60 T160,80 Q180,120 140,140 T80,160 Q40,140 40,80"
            />
          </svg>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-[0.15em] mb-16">
            References
          </h2>

          {/* Reference Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Reference 1 - Hoodie Design */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80"
                alt="Hoodie design reference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Reference 2 - Group Streetwear */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80"
                alt="Streetwear group reference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Reference 3 - Individual Style */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80"
                alt="Individual style reference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
            {/* Reference 4 - Duo Streetwear */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80"
                alt="Duo streetwear reference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Reference 5 - Band/Culture */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80"
                alt="Culture reference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Reference 6 - Bold Style */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
                alt="Bold style reference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#111] to-[#1a1a1a] relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-white/10 rounded-3xl flex items-center justify-center">
            <Instagram className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join The Movement
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
            Be part of the APOSTLE community. Get early access to drops, exclusive content, and connect with like-minded individuals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/apostle"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white text-[#111] px-8 py-4 font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              Follow @apostle
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-white border border-white/30 px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Subscribe to Newsletter
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-white/40">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-sm">Followers</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">25K+</p>
              <p className="text-sm">Community</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-sm">Chapters</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
