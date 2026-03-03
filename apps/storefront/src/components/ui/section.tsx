'use client';

import { type ReactNode } from 'react';
import { cn } from '@urbancart/ui';
import { FadeIn, StaggerReveal, TextReveal } from '../motion/scroll-reveal';
import { CTAButton } from './button';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Base section wrapper with consistent padding
 */
export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24 lg:py-32', className)}>
      {children}
    </section>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

/**
 * Responsive container with max-width
 */
export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1600px]',
    full: 'max-w-none',
  };
  
  return (
    <div className={cn('mx-auto px-4 md:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  animate?: boolean;
}

/**
 * Section header with eyebrow, title, description, and optional CTA
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  ctaText,
  ctaHref,
  className = '',
  animate = true,
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  const content = (
    <div className={cn('flex flex-col', alignClasses, className)}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 text-base text-white/60 md:text-lg',
          align === 'center' ? 'max-w-2xl' : 'max-w-xl'
        )}>
          {description}
        </p>
      )}
      {ctaText && ctaHref && (
        <div className="mt-6">
          <CTAButton href={ctaHref}>{ctaText}</CTAButton>
        </div>
      )}
    </div>
  );
  
  if (animate) {
    return <FadeIn>{content}</FadeIn>;
  }
  
  return content;
}

interface DividerProps {
  className?: string;
}

/**
 * Section divider line
 */
export function Divider({ className = '' }: DividerProps) {
  return <hr className={cn('border-white/10', className)} />;
}

interface GridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Responsive grid layout
 */
export function Grid({
  children,
  columns = 4,
  gap = 'md',
  className = '',
}: GridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };
  
  return (
    <div className={cn('grid', columnClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bento-style grid layout
 */
export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6',
      className
    )}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

/**
 * Bento grid item with customizable span
 */
export function BentoItem({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) {
  const colSpanClasses = {
    1: '',
    2: 'lg:col-span-2',
  };
  
  const rowSpanClasses = {
    1: '',
    2: 'lg:row-span-2',
  };
  
  return (
    <div className={cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan], className)}>
      {children}
    </div>
  );
}

interface SplitSectionProps {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
  className?: string;
}

/**
 * Two-column split section
 */
export function SplitSection({
  left,
  right,
  reverse = false,
  className = '',
}: SplitSectionProps) {
  return (
    <div className={cn(
      'grid gap-8 lg:grid-cols-2 lg:gap-16',
      reverse && 'lg:[&>*:first-child]:order-2',
      className
    )}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

interface FullBleedSectionProps {
  children: ReactNode;
  className?: string;
  background?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

/**
 * Full-width section with optional background
 */
export function FullBleedSection({
  children,
  className = '',
  background,
  overlay = false,
  overlayOpacity = 0.5,
}: FullBleedSectionProps) {
  return (
    <section
      className={cn('relative w-full', className)}
      style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface StatsGridProps {
  stats: Array<{
    value: string | number;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;
  className?: string;
}

/**
 * Stats display grid
 */
export function StatsGrid({ stats, className = '' }: StatsGridProps) {
  return (
    <StaggerReveal>
      <div className={cn('grid grid-cols-2 gap-8 md:grid-cols-4', className)}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-light text-white md:text-5xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className="mt-2 text-sm uppercase tracking-wider text-white/50">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </StaggerReveal>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
}

/**
 * Testimonial card component
 */
export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  className = '',
}: TestimonialCardProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <blockquote className="text-lg font-light italic text-white/80 md:text-xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-medium text-white">{author}</div>
          {role && <div className="text-sm text-white/50">{role}</div>}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * Feature highlight card
 */
export function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-medium uppercase tracking-wider text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/50">{description}</p>
    </div>
  );
}
