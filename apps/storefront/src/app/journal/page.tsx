'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'style', name: 'Style Guide' },
  { id: 'culture', name: 'Street Culture' },
  { id: 'behind-the-scenes', name: 'Behind the Scenes' },
  { id: 'drops', name: 'Drop Announcements' },
];

const posts = [
  {
    id: '1',
    slug: 'spring-2026-collection-lookbook',
    title: 'Spring 2026 Collection Lookbook',
    excerpt: 'Explore the complete lookbook for our Spring 2026 collection featuring bold graphics, sustainable materials, and a fresh take on Indian streetwear.',
    image: '/images/journal/spring-lookbook.jpg',
    category: 'drops',
    date: 'March 15, 2026',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: '2',
    slug: 'how-to-style-oversized-tees',
    title: 'How to Style Oversized Tees: 5 Looks for Every Occasion',
    excerpt: 'From casual hangouts to evening vibes, discover how to elevate your oversized tee game with these versatile styling tips.',
    image: '/images/journal/style-guide-tees.jpg',
    category: 'style',
    date: 'March 10, 2026',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: '3',
    slug: 'street-culture-mumbai-scene',
    title: 'Street Culture: The Mumbai Scene',
    excerpt: 'An inside look at Mumbai\'s thriving streetwear community, the artists and creators shaping the movement, and what makes the scene unique.',
    image: '/images/journal/mumbai-scene.jpg',
    category: 'culture',
    date: 'March 5, 2026',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: '4',
    slug: 'behind-the-design-devanagari-collection',
    title: 'Behind the Design: Devanagari Collection',
    excerpt: 'Meet the artists and designers who brought our Devanagari typography collection to life. Learn about the inspiration and creative process.',
    image: '/images/journal/devanagari-bts.jpg',
    category: 'behind-the-scenes',
    date: 'February 28, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: '5',
    slug: 'sustainable-fashion-our-commitment',
    title: 'Sustainable Fashion: Our Commitment',
    excerpt: 'Learn about our journey towards sustainable fashion, from organic cotton to eco-friendly packaging and ethical manufacturing.',
    image: '/images/journal/sustainability.jpg',
    category: 'behind-the-scenes',
    date: 'February 20, 2026',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: '6',
    slug: 'layering-guide-winter-essentials',
    title: 'The Ultimate Layering Guide: Winter Essentials',
    excerpt: 'Master the art of layering with our comprehensive guide to staying warm and looking fresh with hoodies, jackets, and accessories.',
    image: '/images/journal/layering-guide.jpg',
    category: 'style',
    date: 'February 15, 2026',
    readTime: '4 min read',
    featured: false,
  },
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter((post) => post.featured);

  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">The Journal</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stories, style guides, and behind-the-scenes from the APOSTLE world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-8">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group relative bg-[#f5f5f5] rounded-2xl overflow-hidden aspect-[16/10]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-[#111]">
                  {/* Placeholder for image */}
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <span className="text-sm">Image</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-3">
                    {categories.find((c) => c.id === post.category)?.name}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f5f5f5] border-0 focus:outline-none focus:ring-2 focus:ring-[#111]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#111] text-white'
                    : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e5e5e5]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group bg-white border border-[#eee] rounded-2xl overflow-hidden hover:border-[#ccc] transition-colors"
              >
                <div className="aspect-[16/10] bg-[#f5f5f5] relative">
                  {/* Placeholder for image */}
                  <div className="w-full h-full flex items-center justify-center text-[#ccc]">
                    <span className="text-sm">Image</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3.5 h-3.5 text-[#999]" />
                    <span className="text-xs text-[#666]">
                      {categories.find((c) => c.id === post.category)?.name}
                    </span>
                  </div>
                  <h3 className="font-medium mb-2 group-hover:underline line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#666] line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#999]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#666] mb-4">No articles found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-[#111] underline hover:no-underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="mt-20 bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">Stay in the Loop</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Get the latest articles, style tips, and drop announcements delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-white text-[#111] rounded-xl font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
