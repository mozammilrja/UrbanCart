/**
 * Skeleton Component
 * Loading placeholder
 */

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200',
        className
      )}
      {...props}
    />
  );
}

// Preset skeleton variants
function SkeletonText({ className, ...props }: SkeletonProps) {
  return <Skeleton className={cn('h-4 w-full', className)} {...props} />;
}

function SkeletonTitle({ className, ...props }: SkeletonProps) {
  return <Skeleton className={cn('h-6 w-3/4', className)} {...props} />;
}

function SkeletonAvatar({ className, ...props }: SkeletonProps) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} {...props} />;
}

function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <SkeletonText className="w-3/4" />
      <SkeletonText className="w-1/2" />
    </div>
  );
}

function SkeletonProductCard({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <SkeletonText className="w-2/3" />
      <SkeletonText className="w-1/3" />
    </div>
  );
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonTitle, 
  SkeletonAvatar, 
  SkeletonCard,
  SkeletonProductCard 
};
