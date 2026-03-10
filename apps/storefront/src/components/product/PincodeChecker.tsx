'use client';

import { useState, useCallback } from 'react';
import { MapPin, Truck, RotateCcw, Shield, Check, X } from 'lucide-react';

interface DeliveryInfo {
  available: boolean;
  estimatedDate: string;
  codAvailable: boolean;
  freeDelivery: boolean;
}

function getDeliveryEstimate(pincode: string): DeliveryInfo {
  // Metro city pincodes get faster delivery
  const metroFirst2 = ['11', '40', '50', '56', '60', '70', '38']; // Delhi, Mumbai, Hyd, Blr, Chennai, Kolkata, Ahd
  const isMetro = metroFirst2.some((p) => pincode.startsWith(p));
  const days = isMetro ? 3 : 6;
  const date = new Date();
  date.setDate(date.getDate() + days);
  const estimatedDate = date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return {
    available: true,
    estimatedDate,
    codAvailable: isMetro,
    freeDelivery: isMetro,
  };
}

export function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [delivery, setDelivery] = useState<DeliveryInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = useCallback(() => {
    setError(null);
    setDelivery(null);

    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    const info = getDeliveryEstimate(pincode);
    setDelivery(info);
    setChecked(true);
  }, [pincode]);

  return (
    <div className="border-t border-[#e5e5e5] pt-6 mt-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
        <MapPin className="w-4 h-4" />
        Delivery Options
      </h3>

      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            if (checked) { setChecked(false); setDelivery(null); setError(null); }
          }}
          placeholder="Enter pincode"
          className="flex-1 px-4 py-2.5 text-sm border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#111] transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
        />
        <button
          onClick={handleCheck}
          className="px-5 py-2.5 text-sm font-semibold text-[#111] border border-[#111] rounded-lg hover:bg-[#111] hover:text-white transition-colors"
        >
          Check
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}

      {delivery && (
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">
                Get it by <span className="text-green-700">{delivery.estimatedDate}</span>
              </p>
              {delivery.freeDelivery ? (
                <p className="text-xs text-green-600">FREE Delivery</p>
              ) : (
                <p className="text-xs text-[#777]">Delivery charge ₹99</p>
              )}
            </div>
          </div>

          {delivery.codAvailable && (
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-[#555]">Cash on Delivery available</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-[#555] flex-shrink-0" />
            <p className="text-sm text-[#555]">7-day easy return & exchange</p>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#555] flex-shrink-0" />
            <p className="text-sm text-[#555]">100% original products</p>
          </div>
        </div>
      )}
    </div>
  );
}
