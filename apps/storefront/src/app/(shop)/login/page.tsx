'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@urbancart/ui';
import { useAuthStore } from '@urbancart/hooks';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';
import {
  Section,
  Container,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { MagneticButton } from '@/components/motion/magnetic-button';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock login
    login(
      {
        id: 'user-1',
        firstName: firstName || 'Rahul',
        lastName: lastName || 'Sharma',
        email: email || 'rahul@example.com',
        role: 'customer',
      },
      'mock-access-token',
      'mock-refresh-token'
    );
    
    setIsLoading(false);
    window.location.href = '/account';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Left Side - Brand Image */}
          <div className="relative hidden lg:block">
            <FadeIn>
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1600&fit=crop"
                  alt="Urban fashion"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 p-12">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Welcome to
                </p>
                <h2 className="mt-4 text-5xl font-extralight tracking-tight text-white">
                  Urban<span className="font-medium">Cart</span>
                </h2>
                <p className="mt-4 max-w-sm text-lg text-white/60">
                  Your style. Your statement. Join the streetwear revolution.
                </p>
              </div>
            </FadeIn>
          </div>
          
          {/* Right Side - Form */}
          <div className="flex flex-col justify-center px-8 py-12 lg:px-16">
            <Container size="narrow">
              <FadeIn delay={0.2}>
                {/* Logo for mobile */}
                <Link href="/" className="mb-12 block text-center lg:hidden">
                  <span className="text-2xl font-extralight tracking-[0.2em] text-white">
                    URBAN<span className="font-medium">CART</span>
                  </span>
                </Link>
                
                {/* Header */}
                <div className="mb-10 text-center">
                  <h1 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
                    {activeTab === 'login' ? 'Welcome Back' : 'Join UrbanCart'}
                  </h1>
                  <p className="mt-3 text-white/50">
                    {activeTab === 'login'
                      ? 'Sign in to continue your streetwear journey'
                      : 'Create an account to start shopping'}
                  </p>
                </div>
                
                {/* Tab Switcher */}
                <div className="mb-8 flex border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={cn(
                      'flex-1 pb-4 text-sm uppercase tracking-widest transition-colors',
                      activeTab === 'login'
                        ? 'border-b-2 border-white text-white'
                        : 'text-white/40 hover:text-white/60'
                    )}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={cn(
                      'flex-1 pb-4 text-sm uppercase tracking-widest transition-colors',
                      activeTab === 'register'
                        ? 'border-b-2 border-white text-white'
                        : 'text-white/40 hover:text-white/60'
                    )}
                  >
                    Register
                  </button>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'register' && (
                    <StaggerReveal stagger={0.05}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-white/50">
                            First Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                            <input
                              id="firstName"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="John"
                              required={activeTab === 'register'}
                              className="w-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-white/50">
                            Last Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                            <input
                              id="lastName"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Doe"
                              required={activeTab === 'register'}
                              className="w-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-0"
                            />
                          </div>
                        </div>
                      </div>
                    </StaggerReveal>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                  
                  {activeTab === 'register' && (
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest text-white/50">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          required={activeTab === 'register'}
                          className="w-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-0"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-xs uppercase tracking-widest text-white/50">
                        Password
                      </label>
                      {activeTab === 'login' && (
                        <Link
                          href="/forgot-password"
                          className="text-xs text-white/40 transition-colors hover:text-white"
                        >
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
                        required
                        className="w-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-12 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {activeTab === 'register' && (
                      <p className="text-xs text-white/30">
                        Must be at least 8 characters with 1 number
                      </p>
                    )}
                  </div>
                  
                  {activeTab === 'register' && (
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 h-4 w-4 border-white/20 bg-transparent text-white focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="terms" className="text-sm text-white/50">
                        I agree to the{' '}
                        <Link href="/terms" className="text-white/70 underline hover:text-white">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-white/70 underline hover:text-white">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  )}
                  
                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group flex w-full items-center justify-center gap-3 border border-white bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </form>
                
                {/* Divider */}
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs uppercase tracking-widest text-white/30">Or continue with</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                
                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
                
                {/* Footer */}
                <p className="mt-8 text-center text-sm text-white/40">
                  {activeTab === 'login' ? (
                    <>
                      Don&apos;t have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className="text-white/70 underline hover:text-white"
                      >
                        Create one now
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-white/70 underline hover:text-white"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </FadeIn>
            </Container>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
