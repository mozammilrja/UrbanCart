'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual password reset logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#fafafa]">
        <div className="w-full max-w-md px-4">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl tracking-[0.2em] font-brand">
              APOSTLE
            </Link>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-light tracking-tight mb-3">Check Your Email</h1>
            <p className="text-[#666] mb-6">
              We&apos;ve sent a password reset link to{' '}
              <span className="font-medium text-[#111]">{email}</span>
            </p>
            <p className="text-sm text-[#999] mb-8">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="text-[#111] hover:underline"
              >
                try again
              </button>
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#111] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#fafafa]">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl tracking-[0.2em] font-brand">
            APOSTLE
          </Link>
          <p className="mt-2 text-sm text-[#777]">Reset your password</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-8">
          <h1 className="text-2xl font-light tracking-tight mb-2">Forgot Password?</h1>
          <p className="text-[#666] text-sm mb-6">
            No worries! Enter your email and we&apos;ll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-[#333] transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#111] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <p className="text-center mt-6">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#111]">
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
