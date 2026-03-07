'use client';

import Link from 'next/link';
import { CreditCard, Plus, ArrowLeft, Trash2, Shield, X } from 'lucide-react';
import { useState } from 'react';

const initialCards = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true, color: 'from-blue-600 to-blue-800' },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/25', isDefault: false, color: 'from-orange-500 to-red-600' },
  { id: 3, type: 'RuPay', last4: '5678', expiry: '03/27', isDefault: false, color: 'from-green-600 to-teal-700' },
  { id: 4, type: 'Amex', last4: '1234', expiry: '11/26', isDefault: false, color: 'from-sky-500 to-blue-600' },
];

const initialUpiIds = [
  { id: 1, upi: 'john@paytm', isDefault: true },
  { id: 2, upi: 'johndoe@upi', isDefault: false },
  { id: 3, upi: 'john@gpay', isDefault: false },
];

const cardColors: Record<string, string> = {
  'Visa': 'from-blue-600 to-blue-800',
  'Mastercard': 'from-orange-500 to-red-600',
  'RuPay': 'from-green-600 to-teal-700',
  'Amex': 'from-sky-500 to-blue-600',
};

export default function PaymentsPage() {
  const [cards, setCards] = useState(initialCards);
  const [upiIds, setUpiIds] = useState(initialUpiIds);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddUpi, setShowAddUpi] = useState(false);
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', name: '', type: 'Visa' });
  const [upiForm, setUpiForm] = useState('');

  const handleAddCard = () => {
    if (cardForm.number.length >= 4 && cardForm.expiry) {
      const newCard = {
        id: Date.now(),
        type: cardForm.type,
        last4: cardForm.number.slice(-4),
        expiry: cardForm.expiry,
        isDefault: cards.length === 0,
        color: cardColors[cardForm.type] || 'from-gray-600 to-gray-800',
      };
      setCards([...cards, newCard]);
      setCardForm({ number: '', expiry: '', cvv: '', name: '', type: 'Visa' });
      setShowAddCard(false);
    }
  };

  const handleAddUpi = () => {
    if (upiForm.includes('@')) {
      const newUpi = {
        id: Date.now(),
        upi: upiForm,
        isDefault: upiIds.length === 0,
      };
      setUpiIds([...upiIds, newUpi]);
      setUpiForm('');
      setShowAddUpi(false);
    }
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const removeUpi = (id: number) => {
    setUpiIds(upiIds.filter(u => u.id !== id));
  };

  const setDefaultCard = (id: number) => {
    setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));
  };

  const setDefaultUpi = (id: number) => {
    setUpiIds(upiIds.map(u => ({ ...u, isDefault: u.id === id })));
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Payment Methods</h1>
              <p className="text-[#777] mt-1">Manage your saved payment methods</p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Cards</h2>
            <button 
              onClick={() => setShowAddCard(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 relative">
                {card.isDefault && (
                  <span className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Default</span>
                )}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{card.type} •••• {card.last4}</p>
                    <p className="text-sm text-[#777]">Expires {card.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#e5e5e5]">
                  <button 
                    onClick={() => removeCard(card.id)}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                  {!card.isDefault && (
                    <button 
                      onClick={() => setDefaultCard(card.id)}
                      className="ml-auto text-sm text-[#555] hover:text-[#111]"
                    >
                      Set as default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPI Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">UPI IDs</h2>
            <button 
              onClick={() => setShowAddUpi(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add UPI
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] divide-y divide-[#e5e5e5]">
            {upiIds.map((upi) => (
              <div key={upi.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-lg font-medium">₹</div>
                  <p className="font-medium">{upi.upi}</p>
                  {upi.isDefault && <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Default</span>}
                </div>
                <div className="flex items-center gap-3">
                  {!upi.isDefault && (
                    <button onClick={() => setDefaultUpi(upi.id)} className="text-sm text-[#555] hover:text-[#111]">Set default</button>
                  )}
                  <button onClick={() => removeUpi(upi.id)} className="text-sm text-red-600 hover:text-red-700">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-[#f5f5f5] rounded-2xl p-6 flex items-start gap-4">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-medium">Your payment info is secure</p>
            <p className="text-sm text-[#777] mt-1">We use industry-standard encryption to protect your payment information. Card details are never stored on our servers.</p>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New Card</h3>
              <button onClick={() => setShowAddCard(false)} className="p-2 hover:bg-[#f5f5f5] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Card Type</label>
                <select 
                  value={cardForm.type}
                  onChange={(e) => setCardForm({ ...cardForm, type: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="RuPay">RuPay</option>
                  <option value="Amex">American Express</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardForm.number}
                  onChange={(e) => setCardForm({ ...cardForm, number: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardForm.name}
                  onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardForm.expiry}
                    onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={cardForm.cvv}
                    onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddCard(false)} className="flex-1 px-4 py-3 border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors">
                Cancel
              </button>
              <button onClick={handleAddCard} className="flex-1 px-4 py-3 bg-[#111] text-white rounded-lg hover:bg-[#333] transition-colors">
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add UPI Modal */}
      {showAddUpi && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add UPI ID</h3>
              <button onClick={() => setShowAddUpi(false)} className="p-2 hover:bg-[#f5f5f5] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiForm}
                onChange={(e) => setUpiForm(e.target.value)}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
              />
              <p className="text-xs text-[#777] mt-2">Enter your UPI ID (e.g., name@paytm, name@gpay)</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddUpi(false)} className="flex-1 px-4 py-3 border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors">
                Cancel
              </button>
              <button onClick={handleAddUpi} className="flex-1 px-4 py-3 bg-[#111] text-white rounded-lg hover:bg-[#333] transition-colors">
                Add UPI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
