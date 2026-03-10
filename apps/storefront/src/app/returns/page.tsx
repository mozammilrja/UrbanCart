import type { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
  description: 'APOSTLE return and exchange policy - hassle-free returns within 7 days',
};

export default function ReturnsPage() {
  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Returns & Exchanges</h1>
          <p className="text-lg text-white/70">Hassle-free returns within 7 days</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#f5f5f5] rounded-xl p-5 text-center">
            <Clock className="w-6 h-6 mx-auto mb-3" />
            <p className="font-medium">7 Day Window</p>
            <p className="text-sm text-[#666]">From delivery date</p>
          </div>
          <div className="bg-[#f5f5f5] rounded-xl p-5 text-center">
            <RotateCcw className="w-6 h-6 mx-auto mb-3" />
            <p className="font-medium">Free Returns</p>
            <p className="text-sm text-[#666]">Pick-up arranged</p>
          </div>
          <div className="bg-[#f5f5f5] rounded-xl p-5 text-center">
            <Package className="w-6 h-6 mx-auto mb-3" />
            <p className="font-medium">Easy Exchange</p>
            <p className="text-sm text-[#666]">Size or style</p>
          </div>
        </div>

        {/* Return Process Steps */}
        <div className="bg-[#f9f9f9] rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-medium mb-6">How to Return</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Initiate Return', desc: 'Log in to your account and select the item(s) to return' },
              { step: 2, title: 'Select Reason', desc: 'Choose return reason and preferred refund method' },
              { step: 3, title: 'Schedule Pickup', desc: 'Select a convenient date for doorstep pickup' },
              { step: 4, title: 'Receive Refund', desc: 'Refund processed within 5-7 days after pickup' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-[#666]">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="w-4 h-4 text-[#999] mt-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>Return Policy</h2>
          <p>
            We want you to love your APOSTLE purchase. If you&apos;re not completely satisfied, you can 
            return most items within 7 days of delivery for a full refund or exchange.
          </p>

          <h2>Eligible Items</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-green-200 bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Eligible for Return</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1.5">
                <li>• Unworn items with all tags attached</li>
                <li>• Items in original packaging</li>
                <li>• Items without perfume, deodorant stains</li>
                <li>• Items without alterations</li>
                <li>• Items requested within 7 days</li>
              </ul>
            </div>
            <div className="border border-red-200 bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Not Eligible</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1.5">
                <li>• Worn, washed, or altered items</li>
                <li>• Items with tags removed</li>
                <li>• Items marked as &quot;Final Sale&quot;</li>
                <li>• Innerwear and accessories</li>
                <li>• Custom/personalized items</li>
              </ul>
            </div>
          </div>

          <h2>Exchange Policy</h2>
          <p>
            Want a different size or color? We offer free exchanges on all eligible items. Simply 
            initiate an exchange through your account, and we&apos;ll ship the new item once we receive 
            the original.
          </p>
          <p>
            If the exchange item is priced higher, you&apos;ll need to pay the difference. If it&apos;s lower, 
            the balance will be refunded to your original payment method.
          </p>

          <h2>Refund Timeline</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Payment Method</th>
                <th className="text-left">Refund Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>UPI</td>
                <td>3-5 business days</td>
              </tr>
              <tr>
                <td>Credit/Debit Card</td>
                <td>5-7 business days</td>
              </tr>
              <tr>
                <td>Net Banking</td>
                <td>7-10 business days</td>
              </tr>
              <tr>
                <td>Wallet</td>
                <td>1-2 business days</td>
              </tr>
              <tr>
                <td>Cash on Delivery</td>
                <td>5-7 business days (bank transfer)</td>
              </tr>
            </tbody>
          </table>

          <h2>Damaged or Defective Items</h2>
          <p>
            Received a damaged or defective item? We apologize! Please contact us within 48 hours of 
            delivery with photos of the issue. We&apos;ll arrange an immediate replacement or full refund 
            at no additional cost.
          </p>

          <h2>Wrong Item Received</h2>
          <p>
            If you received an incorrect item, please contact us immediately. We will arrange for pickup 
            and ship the correct item as soon as possible. You will not be charged for this.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 not-prose mt-8">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Important</p>
              <p className="text-sm text-amber-700">
                We reserve the right to deny returns if items don&apos;t meet eligibility criteria. Items 
                found to be worn, damaged by customer, or with missing tags will be shipped back.
              </p>
            </div>
          </div>

          <h2>Contact Us</h2>
          <p>
            Need help with a return or exchange? Contact us at{' '}
            <a href="mailto:support@apostle.in">support@apostle.in</a> or call{' '}
            <a href="tel:+919876543210">+91 98765 43210</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
