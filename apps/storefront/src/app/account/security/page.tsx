'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Smartphone, Eye, EyeOff, Key, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const loginHistory = [
    { id: 1, device: 'Chrome on Windows', location: 'Mumbai, India', time: '2 hours ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Mumbai, India', time: 'Yesterday', current: false },
    { id: 3, device: 'Firefox on MacOS', location: 'Pune, India', time: '3 days ago', current: false },
  ];

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Privacy & Security</h1>
            <p className="text-[#777] mt-1">Manage your account security</p>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#555]" />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-lg">Password</h2>
              <p className="text-sm text-[#777] mt-1">Last changed 30 days ago</p>
              <button className="mt-4 px-4 py-2 bg-[#111] text-white text-sm rounded-lg hover:bg-[#333] transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#555]" />
              </div>
              <div>
                <h2 className="font-medium text-lg">Two-Factor Authentication</h2>
                <p className="text-sm text-[#777] mt-1">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors ${twoFactorEnabled ? 'bg-green-500' : 'bg-[#ddd]'}`}
            >
              <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow ${twoFactorEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">Two-factor authentication is enabled via SMS</p>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden mb-6">
          <div className="p-6 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                <Key className="w-6 h-6 text-[#555]" />
              </div>
              <div>
                <h2 className="font-medium text-lg">Active Sessions</h2>
                <p className="text-sm text-[#777]">Devices where you are logged in</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-[#e5e5e5]">
            {loginHistory.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${session.current ? 'bg-green-500' : 'bg-[#ccc]'}`} />
                  <div>
                    <p className="font-medium text-sm">{session.device}</p>
                    <p className="text-xs text-[#777]">{session.location} • {session.time}</p>
                  </div>
                </div>
                {session.current ? (
                  <span className="text-xs text-green-600 font-medium">Current</span>
                ) : (
                  <button className="text-sm text-red-600 hover:text-red-700">Logout</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="font-medium text-lg text-red-800">Danger Zone</h2>
              <p className="text-sm text-red-700 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="mt-4 px-4 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
