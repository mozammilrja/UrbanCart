'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@urbancart/ui';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Twitter,
  MessageCircle,
  Send,
  CheckCircle,
} from 'lucide-react';
import {
  Section,
  Container,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { MagneticButton } from '@/components/motion/magnetic-button';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'We\'ll respond within 24 hours',
    value: 'hello@urbancart.in',
    action: 'mailto:hello@urbancart.in',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Sat, 10am - 7pm IST',
    value: '+91 98765 43210',
    action: 'tel:+919876543210',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    description: 'DM us for quick queries',
    value: '@urbancart.in',
    action: 'https://instagram.com/urbancart.in',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Chat with us directly',
    value: '+91 98765 43210',
    action: 'https://wa.me/919876543210',
  },
];

const faqItems = [
  {
    question: 'What are your shipping times?',
    answer: 'We ship within 24 hours. Delivery takes 2-5 business days depending on your location.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer free returns within 30 days of purchase. Items must be unworn with tags attached.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship only within India. International shipping is coming soon.',
  },
  {
    question: 'How can I track my order?',
    answer: 'You\'ll receive a tracking link via email and SMS once your order ships.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Hero Section */}
        <Section className="pt-32 pb-16">
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Contact Us
                </p>
                <h1 className="mt-4 text-4xl font-extralight tracking-tight text-white md:text-6xl">
                  Let's <span className="font-medium">Talk</span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
                  Have a question, suggestion, or just want to say hi? We'd love to hear from you.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>
        
        {/* Contact Methods */}
        <Section className="py-0">
          <Container>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StaggerReveal stagger={0.1}>
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col items-center border border-white/10 p-8 text-center transition-all hover:border-white/30 hover:bg-white/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10">
                      <method.icon className="h-6 w-6 text-white/60" />
                    </div>
                    <h3 className="mt-4 font-medium text-white">{method.title}</h3>
                    <p className="mt-1 text-xs text-white/40">{method.description}</p>
                    <p className="mt-3 text-sm text-white/70">{method.value}</p>
                  </a>
                ))}
              </StaggerReveal>
            </div>
          </Container>
        </Section>
        
        {/* Contact Form & Info */}
        <Section>
          <Container>
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Form */}
              <FadeIn>
                <div className="border border-white/10 p-8 md:p-12">
                  <h2 className="text-2xl font-light text-white">Send us a Message</h2>
                  <p className="mt-2 text-sm text-white/50">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  {isSubmitted ? (
                    <div className="mt-12 flex flex-col items-center py-8 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="mt-6 text-xl font-light text-white">Message Sent!</h3>
                      <p className="mt-2 text-sm text-white/50">
                        We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="mt-6 text-sm text-white/50 hover:text-white"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          required
                          className="border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your email"
                          required
                          className="border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        />
                      </div>
                      
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-white/20 bg-transparent px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                      >
                        <option value="" className="bg-black">Select a subject</option>
                        <option value="order" className="bg-black">Order Inquiry</option>
                        <option value="returns" className="bg-black">Returns & Exchanges</option>
                        <option value="product" className="bg-black">Product Question</option>
                        <option value="collaboration" className="bg-black">Collaboration</option>
                        <option value="other" className="bg-black">Other</option>
                      </select>
                      
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message"
                        required
                        rows={5}
                        className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                      />
                      
                      <MagneticButton strength={0.3}>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            'flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors',
                            isSubmitting
                              ? 'bg-white/50 text-black/50'
                              : 'bg-white text-black hover:bg-neutral-200'
                          )}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </button>
                      </MagneticButton>
                    </form>
                  )}
                </div>
              </FadeIn>
              
              {/* Info */}
              <FadeIn delay={0.2}>
                <div>
                  {/* Business Info */}
                  <div className="border border-white/10 p-8">
                    <h3 className="text-lg font-medium text-white">Visit Our Office</h3>
                    <div className="mt-6 space-y-4">
                      <div className="flex gap-4">
                        <MapPin className="h-5 w-5 flex-shrink-0 text-white/40" />
                        <div>
                          <p className="text-white/70">UrbanCart HQ</p>
                          <p className="text-sm text-white/50">123 Fashion Street, Andheri West</p>
                          <p className="text-sm text-white/50">Mumbai, Maharashtra 400058</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Clock className="h-5 w-5 flex-shrink-0 text-white/40" />
                        <div>
                          <p className="text-white/70">Business Hours</p>
                          <p className="text-sm text-white/50">Monday - Saturday: 10am - 7pm IST</p>
                          <p className="text-sm text-white/50">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* FAQ */}
                  <div className="mt-8 border border-white/10 p-8">
                    <h3 className="text-lg font-medium text-white">Frequently Asked Questions</h3>
                    <div className="mt-6 divide-y divide-white/10">
                      {faqItems.map((item, index) => (
                        <div key={index} className="py-4">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="flex w-full items-center justify-between text-left"
                          >
                            <span className="text-sm text-white/80">{item.question}</span>
                            <span className={cn(
                              'text-white/40 transition-transform',
                              expandedFaq === index && 'rotate-180'
                            )}>
                              ↓
                            </span>
                          </button>
                          {expandedFaq === index && (
                            <p className="mt-3 text-sm text-white/50">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/faq"
                      className="mt-4 inline-block text-sm text-white/50 hover:text-white"
                    >
                      View all FAQs →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>
        
        {/* Social CTA */}
        <Section className="border-t border-white/10">
          <Container>
            <FadeIn>
              <div className="text-center">
                <h2 className="text-2xl font-light text-white">Follow Us</h2>
                <p className="mt-2 text-white/50">Stay connected for the latest drops and updates</p>
                <div className="mt-8 flex justify-center gap-4">
                  <a
                    href="https://instagram.com/urbancart.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-white hover:bg-white hover:text-black"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/urbancart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-white hover:bg-white hover:text-black"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
