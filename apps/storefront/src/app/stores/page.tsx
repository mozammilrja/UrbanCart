import type { Metadata } from 'next';
import { MapPin, Sparkles } from 'lucide-react';
import { StoreLocationsSection } from '@/components/sections';
import { storeLocations } from '@/data/mock';

export const metadata: Metadata = {
  title: 'Our Stores | APOSTLE',
  description: 'Visit APOSTLE flagship stores across India. Experience premium streetwear in person.',
};

export default function StoresPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Experience APOSTLE In Person</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              Our <span className="font-semibold">Flagship</span> Stores
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10">
              Step into the world of APOSTLE. Discover exclusive in-store collections and personalized styling at our flagship locations.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-white">{storeLocations.length}</p>
                <p className="text-sm text-white/50 mt-1">Flagship Stores</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-white">3</p>
                <p className="text-sm text-white/50 mt-1">Cities</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-white">7</p>
                <p className="text-sm text-white/50 mt-1">Days Open</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Store Locations */}
      <StoreLocationsSection stores={storeLocations} />
    </div>
  );
}
