'use client';

import Link from 'next/link';
import { MapPin, Plus, ArrowLeft, Edit2, Trash2, Home, Building } from 'lucide-react';

const addresses = [
  { id: 1, type: 'Home', name: 'John Doe', address: '123 Main Street, Apartment 4B', city: 'Mumbai', state: 'Maharashtra', pin: '400001', phone: '+91 98765 43210', isDefault: true },
  { id: 2, type: 'Office', name: 'John Doe', address: '456 Business Park, Tower A, Floor 12', city: 'Mumbai', state: 'Maharashtra', pin: '400051', phone: '+91 98765 43211', isDefault: false },
];

export default function AddressesPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Saved Addresses</h1>
              <p className="text-[#777] mt-1">{addresses.length} addresses</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] text-white rounded-lg hover:bg-[#333] transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 relative">
              {addr.isDefault && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Default</span>
              )}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                  {addr.type === 'Home' ? <Home className="w-5 h-5 text-[#555]" /> : <Building className="w-5 h-5 text-[#555]" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{addr.type}</p>
                  </div>
                  <p className="text-sm text-[#555] mt-2">{addr.name}</p>
                  <p className="text-sm text-[#777] mt-1">{addr.address}</p>
                  <p className="text-sm text-[#777]">{addr.city}, {addr.state} - {addr.pin}</p>
                  <p className="text-sm text-[#777] mt-1">{addr.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#e5e5e5]">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-[#f5f5f5] rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                {!addr.isDefault && (
                  <button className="ml-auto text-sm text-[#555] hover:text-[#111] transition-colors">Set as default</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
