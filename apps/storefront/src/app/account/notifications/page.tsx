'use client';

import Link from 'next/link';
import { ArrowLeft, Bell, Mail, MessageSquare, Tag, Truck } from 'lucide-react';
import { useState } from 'react';

const notificationSettings = [
  { id: 'orders', icon: Truck, title: 'Order Updates', desc: 'Get notified about order status changes', email: true, push: true },
  { id: 'offers', icon: Tag, title: 'Offers & Promotions', desc: 'Exclusive deals and discount alerts', email: true, push: false },
  { id: 'drops', icon: Bell, title: 'New Drops', desc: 'Be the first to know about new collections', email: true, push: true },
  { id: 'restock', icon: MessageSquare, title: 'Restock Alerts', desc: 'Notifications when wishlist items are back', email: true, push: true },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#111]' : 'bg-[#ddd]'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState(notificationSettings);

  const toggleEmail = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, email: !s.email } : s));
  };

  const togglePush = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, push: !s.push } : s));
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Notifications</h1>
            <p className="text-[#777] mt-1">Manage your notification preferences</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
          <div className="p-4 border-b border-[#e5e5e5] bg-[#fafafa]">
            <div className="grid grid-cols-[1fr_80px_80px] gap-4 text-sm font-medium text-[#555]">
              <span>Notification Type</span>
              <span className="text-center flex items-center justify-center gap-1"><Mail className="w-4 h-4" /> Email</span>
              <span className="text-center flex items-center justify-center gap-1"><Bell className="w-4 h-4" /> Push</span>
            </div>
          </div>
          <div className="divide-y divide-[#e5e5e5]">
            {settings.map((setting) => {
              const Icon = setting.icon;
              return (
                <div key={setting.id} className="grid grid-cols-[1fr_80px_80px] gap-4 p-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#555]" />
                    </div>
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-[#777]">{setting.desc}</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Toggle enabled={setting.email} onChange={() => toggleEmail(setting.id)} />
                  </div>
                  <div className="flex justify-center">
                    <Toggle enabled={setting.push} onChange={() => togglePush(setting.id)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#fff8e5] rounded-xl flex items-start gap-3">
          <Bell className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">Enable browser notifications to receive real-time updates about your orders and exclusive drops.</p>
        </div>
      </div>
    </div>
  );
}
