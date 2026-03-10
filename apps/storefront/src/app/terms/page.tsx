import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'APOSTLE terms of service - terms and conditions for using our website and services',
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 md:pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[#111] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Terms of Service</h1>
          <p className="text-lg text-white/70">Last updated: March 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-gray max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the APOSTLE website at apostle.in (the &quot;Site&quot;), you agree to be bound 
            by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, you are 
            prohibited from using the Site.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Your continued use of the Site 
            following any changes constitutes acceptance of those changes.
          </p>

          <h2>2. Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the Site</li>
            <li>Interfere with or disrupt the Site or servers</li>
            <li>Use automated systems (bots, scrapers) without permission</li>
            <li>Impersonate any person or entity</li>
            <li>Upload malicious code or harmful content</li>
          </ul>

          <h2>3. Account Registration</h2>
          <p>
            To make purchases or access certain features, you may need to create an account. You are 
            responsible for:
          </p>
          <ul>
            <li>Providing accurate and complete information</li>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms or are 
            inactive for an extended period.
          </p>

          <h2>4. Products and Pricing</h2>
          <p>
            All products displayed on the Site are subject to availability. We reserve the right to:
          </p>
          <ul>
            <li>Limit quantities of products available for purchase</li>
            <li>Discontinue any product at any time</li>
            <li>Modify product descriptions and images</li>
            <li>Correct pricing errors</li>
          </ul>
          <p>
            Prices are displayed in Indian Rupees (INR) and include applicable taxes unless otherwise 
            stated. We reserve the right to change prices without prior notice.
          </p>

          <h2>5. Orders and Payment</h2>
          <p>
            When you place an order, you are making an offer to purchase products. We reserve the 
            right to accept or decline your order for any reason, including:
          </p>
          <ul>
            <li>Product unavailability</li>
            <li>Pricing or description errors</li>
            <li>Suspected fraudulent activity</li>
            <li>Exceeding quantity limits</li>
          </ul>
          <p>
            Payment must be made in full at the time of purchase. We accept UPI, credit/debit cards, 
            net banking, wallets, and cash on delivery (for eligible orders).
          </p>

          <h2>6. Shipping and Delivery</h2>
          <p>
            Shipping terms, delivery times, and associated costs are outlined in our{' '}
            <Link href="/shipping">Shipping Policy</Link>. Delivery times are estimates and are not 
            guaranteed. We are not responsible for delays caused by shipping carriers, customs, or 
            circumstances beyond our control.
          </p>

          <h2>7. Returns and Refunds</h2>
          <p>
            Our return and refund policies are detailed in our{' '}
            <Link href="/returns">Returns & Exchanges Policy</Link>. By making a purchase, you agree 
            to abide by these policies.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on the Site, including but not limited to text, graphics, logos, images, 
            product designs, and software, is the property of APOSTLE or its licensors and is 
            protected by intellectual property laws.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Copy, reproduce, or distribute any content without permission</li>
            <li>Modify or create derivative works</li>
            <li>Use our trademarks or branding without authorization</li>
            <li>Remove any copyright or proprietary notices</li>
          </ul>

          <h2>9. User Content</h2>
          <p>
            If you submit content to our Site (reviews, comments, images), you grant us a 
            non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, 
            and display that content in connection with our business.
          </p>
          <p>
            You represent that you own or have the necessary rights to submit such content and 
            that it does not violate any third-party rights or applicable laws.
          </p>

          <h2>10. Disclaimer of Warranties</h2>
          <p>
            THE SITE AND ALL PRODUCTS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES 
            OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES 
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Site will be uninterrupted, error-free, secure, or free 
            from viruses or other harmful components.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, APOSTLE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO 
            YOUR USE OF THE SITE OR PURCHASE OF PRODUCTS.
          </p>
          <p>
            OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS SHALL NOT EXCEED THE AMOUNT 
            YOU PAID FOR THE SPECIFIC PRODUCT OR SERVICE THAT GAVE RISE TO THE CLAIM.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless APOSTLE, its officers, directors, 
            employees, and agents from any claims, liabilities, damages, losses, and expenses 
            arising from your:
          </p>
          <ul>
            <li>Use of the Site</li>
            <li>Violation of these Terms</li>
            <li>Violation of any third-party rights</li>
            <li>Content you submit to the Site</li>
          </ul>

          <h2>13. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or services. We do not control and 
            are not responsible for the content, privacy policies, or practices of these external 
            sites. Accessing third-party links is at your own risk.
          </p>

          <h2>14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. 
            Any disputes arising from these Terms or your use of the Site shall be subject to the 
            exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>

          <h2>15. Dispute Resolution</h2>
          <p>
            Any dispute arising from these Terms shall first be attempted to be resolved through 
            good-faith negotiation. If negotiation fails, disputes shall be submitted to binding 
            arbitration in accordance with the Arbitration and Conciliation Act, 1996.
          </p>

          <h2>16. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining 
            provisions shall continue in full force and effect.
          </p>

          <h2>17. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and any other policies referenced herein, 
            constitute the entire agreement between you and APOSTLE regarding the use of the Site.
          </p>

          <h2>18. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:legal@apostle.in">legal@apostle.in</a></li>
            <li>Phone: <a href="tel:+919876543210">+91 98765 43210</a></li>
            <li>Address: 123 Fashion Street, Mumbai, Maharashtra 400001, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
