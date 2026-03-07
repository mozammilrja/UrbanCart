'use client';

import Link from 'next/link';
import { ArrowLeft, Gift, Star, Zap, ChevronRight, Crown, Sparkles } from 'lucide-react';

const tiers = [
  { name: 'Bronze', min: 0, max: 2000, color: 'from-orange-400 to-orange-600' },
  { name: 'Silver', min: 2000, max: 5000, color: 'from-gray-400 to-gray-500' },
  { name: 'Gold', min: 5000, max: 10000, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Platinum', min: 10000, max: null, color: 'from-purple-400 to-purple-600' },
];

const rewards = [
  { id: 1, title: '10% Off Your Next Order', points: 500, type: 'discount' },
  { id: 2, title: 'Free Express Shipping', points: 300, type: 'shipping' },
  { id: 3, title: 'Early Access to Drops', points: 1000, type: 'access' },
  { id: 4, title: 'Birthday Surprise Box', points: 2000, type: 'gift' },
];

const history = [
  { id: 1, action: 'Order #ORD-2024-001', points: 250, type: 'earned', date: '28 Feb' },
  { id: 2, action: 'Redeemed: 10% Off', points: -500, type: 'spent', date: '15 Feb' },
  { id: 3, action: 'Order #ORD-2024-002', points: 125, type: 'earned', date: '10 Feb' },
  { id: 4, action: 'Referral Bonus', points: 500, type: 'earned', date: '05 Feb' },
];

export default function RewardsPage() {
  const currentPoints = 1250;
  const currentTier = tiers.find(t => currentPoints >= t.min && (t.max === null || currentPoints < t.max));
  const nextTier = tiers[tiers.indexOf(currentTier!) + 1];
  const progress = nextTier ? ((currentPoints - currentTier!.min) / (nextTier.min - currentTier!.min)) * 100 : 100;

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Rewards & Offers</h1>
            <p className="text-[#777] mt-1">Earn points, unlock rewards</p>
          </div>
        </div>

        {/* Points Card */}
        <div className="bg-gradient-to-br from-[#111] to-[#333] rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-sm">Available Points</p>
              <p className="text-4xl md:text-5xl font-bold mt-1">{currentPoints.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-3">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{currentTier?.name} Member</span>
              </div>
            </div>
            <Sparkles className="w-12 h-12 text-white/20" />
          </div>
          {nextTier && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70">{nextTier.min - currentPoints} pts to {nextTier.name}</span>
                <span className="text-white/70">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: progress + '%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Redeem Rewards</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-5 flex items-center justify-between group hover:border-[#111] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                    <Gift className="w-6 h-6 text-[#555]" />
                  </div>
                  <div>
                    <p className="font-medium">{reward.title}</p>
                    <p className="text-sm text-[#777]">{reward.points} points</p>
                  </div>
                </div>
                <button
                  disabled={currentPoints < reward.points}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPoints >= reward.points
                      ? 'bg-[#111] text-white hover:bg-[#333]'
                      : 'bg-[#f5f5f5] text-[#999] cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div>
          <h2 className="text-lg font-medium mb-4">Points History</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] divide-y divide-[#e5e5e5]">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'earned' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    {item.type === 'earned' ? <Zap className="w-5 h-5 text-green-600" /> : <Gift className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-[#777]">{item.date}</p>
                  </div>
                </div>
                <span className={`font-medium ${item.type === 'earned' ? 'text-green-600' : 'text-orange-600'}`}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
