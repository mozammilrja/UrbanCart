'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  Star,
  Sparkles,
  Heart,
  Share2,
  Instagram,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { products } from '@/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';

// Chapter data
const chapters = [
  {
    id: 1,
    number: '01',
    title: 'Genesis',
    subtitle: 'Where It All Began',
    description: 'The story of APOSTLE begins in the streets of Mumbai. Born from a desire to create fashion that speaks to the rebellious spirit of Indian youth.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    color: 'from-orange-600 to-red-700',
    year: '2023',
    quote: '"We don\'t follow trends. We create movements."',
    stats: { pieces: 12, drops: 1, cities: 3 }
  },
  {
    id: 2,
    number: '02',
    title: 'Uprising',
    subtitle: 'The Movement Grows',
    description: 'Chapter Two saw APOSTLE expand beyond Mumbai. Pop-ups in Delhi and Bangalore brought our vision to new communities.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80',
    color: 'from-purple-600 to-indigo-700',
    year: '2024',
    quote: '"Every piece tells a story. Every wearer becomes a storyteller."',
    stats: { pieces: 24, drops: 3, cities: 6 }
  },
  {
    id: 3,
    number: '03',
    title: 'Revolution',
    subtitle: 'Redefining Streetwear',
    description: 'The latest chapter pushes boundaries further. Experimental fabrics, bold graphics, and limited collaborations define this era.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    color: 'from-emerald-600 to-teal-700',
    year: '2025',
    quote: '"The revolution will be stylish."',
    stats: { pieces: 36, drops: 5, cities: 12 }
  },
  {
    id: 4,
    number: '04',
    title: 'Horizon',
    subtitle: 'What Comes Next',
    description: 'Chapter Four is being written right now. New collaborations, international expansion, and designs that challenge everything.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80',
    color: 'from-blue-600 to-cyan-700',
    year: '2026',
    quote: '"The future belongs to those who dare."',
    stats: { pieces: '??', drops: '??', cities: '??' }
  }
];

// Featured products from chapters
const featuredProducts = products.slice(0, 4);

// Events/milestones
const milestones = [
  { date: 'Mar 2023', event: 'APOSTLE Founded', iconType: 'star' },
  { date: 'Aug 2023', event: 'First Drop: Genesis Collection', iconType: 'sparkles' },
  { date: 'Feb 2024', event: 'Delhi Pop-up Store', iconType: 'mappin' },
  { date: 'Nov 2024', event: '10,000 Community Members', iconType: 'users' },
  { date: 'Jun 2025', event: 'International Shipping Launch', iconType: 'arrow' },
  { date: 'Mar 2026', event: 'Chapter Four Begins', iconType: 'star' },
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

  const currentChapter = chapters[activeChapter];

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
            <div className="flex items-center gap-3">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(index)}
                  className={cn(
                    "transition-all",
                    index === activeChapter
                      ? "w-12 h-2 bg-white rounded-full"
                      : "w-2 h-2 bg-white/40 rounded-full hover:bg-white/60"
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

          {/* Year Badge */}
          <div className="absolute top-8 right-8 md:right-16">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
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

      {/* Chapter Grid */}
      <section className="py-20 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-white/50 uppercase tracking-widest">Explore</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">All Chapters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapter(index);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn(
                  "group relative aspect-[16/9] rounded-3xl overflow-hidden text-left",
                  activeChapter === index && "ring-2 ring-white ring-offset-4 ring-offset-[#0a0a0a]"
                )}
              >
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-70 group-hover:opacity-80 transition-opacity",
                  chapter.color
                )} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-white/50 text-sm font-medium mb-2">Chapter {chapter.number}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{chapter.title}</h3>
                  <p className="text-white/70">{chapter.subtitle}</p>
                  
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">View Chapter</span>
                    <ArrowRight className="w-4 h-4 text-white" />
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
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product._id}
                product={product}
                priority={index < 4}
              />
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
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-sm">Community</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-sm">Cities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
