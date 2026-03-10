'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, Package, Truck, RotateCcw, CreditCard, Shield, HelpCircle } from 'lucide-react';

const faqCategories = [
  { id: 'orders', label: 'Orders & Tracking', icon: Package },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'products', label: 'Products', icon: Shield },
  { id: 'general', label: 'General', icon: HelpCircle },
];

const faqs = {
  orders: [
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you\'ll receive an email with a tracking link. You can also track your order by logging into your account and visiting the "Orders" section. Tracking updates may take 24-48 hours to appear after your order ships.',
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 2 hours of placing them. After this window, orders enter processing and cannot be changed. Please contact our support team immediately if you need to make changes.',
    },
    {
      question: 'What should I do if I receive a damaged item?',
      answer: 'We\'re sorry if you received a damaged item. Please contact us within 48 hours of delivery with photos of the damage. We\'ll arrange a free return and send you a replacement immediately.',
    },
  ],
  shipping: [
    {
      question: 'What are the shipping charges?',
      answer: 'We offer free shipping on all orders above ₹2,000. For orders below ₹2,000, a flat shipping fee of ₹99 applies. Express shipping is available at checkout for an additional charge.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 5-7 business days for metro cities and 7-10 business days for other areas. Express delivery (3-4 days) is available for select pin codes.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship within India only. International shipping will be available soon. Sign up for our newsletter to be notified when we expand.',
    },
    {
      question: 'Can I change my delivery address?',
      answer: 'Address changes can be made within 2 hours of placing your order. After that, please contact our support team - we\'ll try our best to accommodate your request if the order hasn\'t shipped yet.',
    },
  ],
  returns: [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return window from the date of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Final sale items and accessories are non-returnable.',
    },
    {
      question: 'How do I initiate a return?',
      answer: 'Log into your account, go to "Orders", select the item you want to return, and click "Return Item". You\'ll receive a return label via email. Pack the item securely and drop it off at the nearest courier partner location.',
    },
    {
      question: 'How long does it take to process a refund?',
      answer: 'Refunds are processed within 5-7 business days after we receive and inspect your return. The amount will be credited to your original payment method. Bank processing times may add 2-5 additional days.',
    },
    {
      question: 'Can I exchange for a different size?',
      answer: 'Yes! Exchanges for different sizes are free (subject to availability). Simply initiate a return and select "Exchange" instead of "Refund". We\'ll ship the new size once we receive your return.',
    },
  ],
  payments: [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and popular wallets. Cash on Delivery is available for orders under ₹10,000.',
    },
    {
      question: 'Is it safe to pay online?',
      answer: 'Absolutely. All transactions are processed through Razorpay, India\'s leading payment gateway, with 256-bit SSL encryption. We never store your card details on our servers.',
    },
    {
      question: 'My payment failed but money was deducted. What should I do?',
      answer: 'Failed transactions are automatically refunded within 5-7 business days. If you don\'t see the refund, please contact your bank first. If the issue persists, reach out to us with your transaction details.',
    },
    {
      question: 'Do you offer EMI options?',
      answer: 'Yes, we offer no-cost EMI on orders above ₹3,000 through select bank cards. EMI options will be displayed at checkout if your card is eligible.',
    },
  ],
  products: [
    {
      question: 'How do I find my size?',
      answer: 'Each product page has a detailed size guide with measurements. We recommend measuring a similar garment you own and comparing it to our size chart. Our products have an oversized/relaxed fit unless specified otherwise.',
    },
    {
      question: 'Are your products true to size?',
      answer: 'Our products are designed with a relaxed, streetwear-inspired fit. If you prefer a closer fit, we recommend sizing down. Check the product description for specific fit notes.',
    },
    {
      question: 'What materials do you use?',
      answer: 'We use premium 300-400gsm heavyweight cotton for most of our products. All materials are pre-shrunk and enzyme-washed for softness. Detailed composition is listed on each product page.',
    },
    {
      question: 'How should I care for my APOSTLE pieces?',
      answer: 'Machine wash cold inside out with similar colors. Tumble dry low or hang dry. Avoid bleach and dry cleaning. Following these instructions will help maintain the quality and color of your garments.',
    },
  ],
  general: [
    {
      question: 'Where are your stores located?',
      answer: 'We currently have stores (Chapters) in Mumbai and Delhi. Visit our Store Locator page for addresses, hours, and directions. More locations coming soon!',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes! Premium gift wrapping is available for ₹99. Select the gift wrap option at checkout and add a personalized message. Your item will arrive beautifully packaged.',
    },
    {
      question: 'How can I stay updated on new drops?',
      answer: 'Subscribe to our newsletter for early access to drops, exclusive offers, and member-only content. You can also follow us on Instagram @apostle for real-time updates.',
    },
    {
      question: 'Do you collaborate with artists?',
      answer: 'Yes, we actively collaborate with artists, designers, and brands. If you\'re interested in a collaboration, please reach out through our Contact page with your portfolio.',
    },
  ],
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (question: string) => {
    setOpenItems(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const currentFaqs = faqs[activeCategory as keyof typeof faqs] || [];
  
  // Filter based on search
  const filteredFaqs = searchQuery
    ? Object.values(faqs).flat().filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentFaqs;

  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">How can we help?</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            Find answers to frequently asked questions
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-white text-[#111] rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!searchQuery && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-medium mb-4">Categories</h2>
              <div className="space-y-2">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-[#111] text-white'
                        : 'bg-[#f5f5f5] text-[#333] hover:bg-[#e5e5e5]'
                    }`}
                  >
                    <cat.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-light tracking-tight mb-6">
                {faqCategories.find(c => c.id === activeCategory)?.label}
              </h2>
              <div className="space-y-4">
                {currentFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.question)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          openItems.includes(faq.question) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openItems.includes(faq.question) && (
                      <div className="px-5 pb-5">
                        <p className="text-[#666] leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-6">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
            </h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.question)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        openItems.includes(faq.question) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.includes(faq.question) && (
                    <div className="px-5 pb-5">
                      <p className="text-[#666] leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#666]">No results found. Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Still need help */}
        <div className="mt-16 bg-[#f5f5f5] rounded-2xl p-8 text-center">
          <h3 className="text-xl font-light tracking-tight mb-3">Still have questions?</h3>
          <p className="text-[#666] mb-6">Our support team is here to help</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-[#111] text-white rounded-xl hover:bg-black transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
