import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Eye, Lock, UserCheck, Mail, Bell, Cookie, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'APOSTLE privacy policy - how we collect, use, and protect your data',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-lg text-white/70">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Summary */}
        <div className="bg-[#f9f9f9] rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-medium mb-4">Privacy at a Glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 mt-0.5 text-[#666]" />
              <div>
                <p className="font-medium">Data Protection</p>
                <p className="text-sm text-[#666]">Industry-standard encryption for all data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 mt-0.5 text-[#666]" />
              <div>
                <p className="font-medium">Transparency</p>
                <p className="text-sm text-[#666]">Clear information about data usage</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 mt-0.5 text-[#666]" />
              <div>
                <p className="font-medium">No Data Sale</p>
                <p className="text-sm text-[#666]">We never sell your personal data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 mt-0.5 text-[#666]" />
              <div>
                <p className="font-medium">Your Control</p>
                <p className="text-sm text-[#666]">Access, update, or delete your data</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>Introduction</h2>
          <p>
            APOSTLE (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our 
            website apostle.in (the &quot;Site&quot;) or make a purchase from us.
          </p>
          <p>
            By using our Site, you agree to the collection and use of information in accordance with 
            this policy. If you do not agree with our policies, please do not use our Site.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>When you create an account or make a purchase, we may collect:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Account credentials (email and encrypted password)</li>
            <li>Order history and preferences</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our Site, we automatically collect:</p>
          <ul>
            <li>Device information (browser type, operating system, device type)</li>
            <li>IP address and location data (city/region level)</li>
            <li>Browsing behavior (pages visited, time spent, click patterns)</li>
            <li>Referral source (how you found our Site)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to customer service requests</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Personalize your shopping experience</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Payment processors (Razorpay), shipping partners, email service providers, and analytics tools</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
          <p>
            <strong>We do not sell, rent, or trade your personal information to third parties 
            for marketing purposes.</strong>
          </p>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. Cookies help us:
          </p>
          <ul>
            <li>Remember your preferences and cart contents</li>
            <li>Keep you logged in</li>
            <li>Understand how you use our Site</li>
            <li>Deliver relevant advertisements</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Note that disabling cookies may 
            affect Site functionality.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information:
          </p>
          <ul>
            <li>SSL/TLS encryption for all data transmission</li>
            <li>Secure payment processing through PCI-compliant partners</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Limited access to personal data on a need-to-know basis</li>
          </ul>
          <p>
            While we strive to protect your information, no method of transmission over the Internet 
            is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Correct:</strong> Update or correct inaccurate information</li>
            <li><strong>Delete:</strong> Request deletion of your personal data (subject to legal requirements)</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
            <li><strong>Portability:</strong> Receive your data in a structured, commonly used format</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at privacy@apostle.in.
          </p>

          <h2>Marketing Communications</h2>
          <p>
            With your consent, we may send you promotional emails about new products, collections, 
            and exclusive offers. You can opt-out at any time by:
          </p>
          <ul>
            <li>Clicking &quot;Unsubscribe&quot; in any marketing email</li>
            <li>Updating your preferences in your account settings</li>
            <li>Contacting us directly</li>
          </ul>
          <p>
            Note: We will still send transactional emails (order confirmations, shipping updates) 
            even if you opt-out of marketing.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our Site may contain links to third-party websites. We are not responsible for the 
            privacy practices of these external sites. We encourage you to review their privacy 
            policies before providing any personal information.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our Site is not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children. If you believe we have collected information from a 
            child, please contact us immediately.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:privacy@apostle.in">privacy@apostle.in</a></li>
            <li>Phone: <a href="tel:+919876543210">+91 98765 43210</a></li>
            <li>Address: 123 Fashion Street, Mumbai, Maharashtra 400001, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
