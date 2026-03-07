'use client';

import Link from 'next/link';
import { ArrowLeft, User, Mail, Phone, Calendar, Globe, Moon, Sun, ChevronRight, Camera } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    birthday: '15 August 1995',
    language: 'English',
    currency: 'INR (₹)',
  });

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Account Settings</h1>
            <p className="text-[#777] mt-1">Manage your profile and preferences</p>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#111] to-[#333] flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center shadow-sm hover:bg-[#f5f5f5] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-medium text-lg">{profile.name}</p>
              <p className="text-sm text-[#777]">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden mb-6">
          <div className="p-4 border-b border-[#e5e5e5] flex items-center justify-between">
            <h2 className="font-medium">Profile Information</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm text-[#555] hover:text-[#111] transition-colors"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="divide-y divide-[#e5e5e5]">
            {[
              { icon: User, label: 'Full Name', value: profile.name, key: 'name' },
              { icon: Mail, label: 'Email Address', value: profile.email, key: 'email' },
              { icon: Phone, label: 'Phone Number', value: profile.phone, key: 'phone' },
              { icon: Calendar, label: 'Birthday', value: profile.birthday, key: 'birthday' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#555]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#777]">{item.label}</p>
                    {editMode ? (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => setProfile({ ...profile, [item.key]: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111] text-sm"
                      />
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {editMode && (
            <div className="p-4 border-t border-[#e5e5e5] flex justify-end gap-3">
              <button onClick={() => setEditMode(false)} className="px-4 py-2 text-sm border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors">
                Cancel
              </button>
              <button onClick={() => setEditMode(false)} className="px-4 py-2 text-sm bg-[#111] text-white rounded-lg hover:bg-[#333] transition-colors">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
          <div className="p-4 border-b border-[#e5e5e5]">
            <h2 className="font-medium">Preferences</h2>
          </div>
          <div className="divide-y divide-[#e5e5e5]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#555]" />
                </div>
                <div>
                  <p className="text-sm text-[#777]">Language</p>
                  <p className="font-medium">{profile.language}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#ccc]" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                  {darkMode ? <Moon className="w-5 h-5 text-[#555]" /> : <Sun className="w-5 h-5 text-[#555]" />}
                </div>
                <div>
                  <p className="text-sm text-[#777]">Appearance</p>
                  <p className="font-medium">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-[#111]' : 'bg-[#ddd]'}`}
              >
                <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow ${darkMode ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
