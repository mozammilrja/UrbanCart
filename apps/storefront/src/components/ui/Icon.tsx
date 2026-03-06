'use client';

import type { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
  size?: number;
}

/**
 * SSR-safe Icon wrapper component for lucide-react icons.
 * Uses the `size` prop for deterministic rendering, avoiding hydration mismatches.
 * 
 * @example
 * ```tsx
 * import { Menu } from 'lucide-react';
 * import { Icon } from '@/components/ui/Icon';
 * 
 * <Icon icon={Menu} size={24} />
 * <Icon icon={Menu} size={20} className="text-gray-500" />
 * ```
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = 24, className, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        size={size}
        className={className}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
