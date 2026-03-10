import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Clock, MapPin, Package, Shield, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Learn about APOSTLE shipping options, delivery times, and charges',
};

export default function ShippingPolicyPage() {
  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Shipping Policy</h1>
          <p className="text-lg text-white/70">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#f5f5f5] rounded-xl p-5 text-center">
            <Truck className="w-6 h-6 mx-auto mb-3" />
            <p className="font-medium">Free Shipping</p>
            <p className="text-sm text-[#666]">On orders over ₹2,000</p>
          </div>
          <div className="bg-[#f5f5f5] rounded-xl p-5 text-center">
            <Clock className="w-6 h-6 mx-auto mb-3" />
            <p className="font-medium">5-7 Days</p>
            <p className="text-sm text-[#666]">Standard delivery</p>
          </div>
          <div className="bg-[#f5f5f5] rounded-xl p-5 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-3" />
            <p className="font-medium">Pan India</p>
            <p className="text-sm text-[#666]">We deliver everywhere</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>Shipping Rates</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Order Value</th>
                <th className="text-left">Shipping Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Below ₹2,000</td>
                <td>₹99</td>
              </tr>
              <tr>
                <td>₹2,000 and above</td>
                <td>Free</td>
              </tr>
              <tr>
                <td>Express Shipping (if available)</td>
                <td>₹199</td>
              </tr>
            </tbody>
          </table>

          <h2>Delivery Times</h2>
          <p>
            Once your order is confirmed, we typically dispatch within 1-2 business days. Delivery times 
            depend on your location:
          </p>
          <ul>
            <li><strong>Metro Cities</strong> (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata): 5-7 business days</li>
            <li><strong>Other Cities</strong>: 7-10 business days</li>
            <li><strong>Remote Areas</strong>: 10-14 business days</li>
          </ul>
          <p>
            Express shipping (3-4 business days) is available for select pin codes at an additional charge.
          </p>

          <h2>Order Processing</h2>
          <p>
            Orders are processed Monday through Saturday, excluding public holidays. Orders placed after 
            2:00 PM IST will be processed the next business day.
          </p>
          <p>
            You will receive an email confirmation with tracking details once your order has been dispatched. 
            Tracking information may take 24-48 hours to update after shipment.
          </p>

          <h2>Shipping Partners</h2>
          <p>
            We partner with trusted courier services including BlueDart, Delhivery, and DTDC to ensure 
            safe and timely delivery of your orders. The shipping partner may vary based on your location 
            and order requirements.
          </p>

          <h2>Address Guidelines</h2>
          <ul>
            <li>Please provide complete address including apartment/house number, street, landmark, city, state, and PIN code</li>
            <li>Ensure someone is available at the delivery address to receive the package</li>
            <li>For gated communities or apartments, please provide access instructions</li>
            <li>Address changes can only be accommodated within 2 hours of placing an order</li>
          </ul>

          <h2>Delivery Attempts</h2>
          <p>
            Our courier partners will make up to 3 delivery attempts. If delivery is unsuccessful after 
            all attempts, the package will be returned to us. In such cases, we will initiate a refund 
            after deducting shipping charges, and you may place a new order.
          </p>

          <h2>Damaged or Missing Packages</h2>
          <p>
            Please inspect your package upon delivery. If the outer packaging appears damaged, we recommend 
            refusing the delivery or noting the damage with the courier. Contact us within 48 hours of 
            delivery with photos of any damage for a replacement or refund.
          </p>

          <h2>International Shipping</h2>
          <p>
            We currently only ship within India. International shipping will be available soon. Subscribe 
            to our newsletter to be notified when we expand our shipping regions.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 not-prose mt-8">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Note</p>
              <p className="text-sm text-amber-700">
                Delivery times may be affected during sales, festive seasons, or due to unforeseen 
                circumstances. We appreciate your patience.
              </p>
            </div>
          </div>

          <h2>Contact Us</h2>
          <p>
            For shipping-related queries, please contact us at{' '}
            <a href="mailto:support@apostle.in">support@apostle.in</a> or call us at {' '}
            <a href="tel:+919876543210">+91 98765 43210</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
