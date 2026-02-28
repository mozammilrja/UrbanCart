'use client';

import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ToastVariant = 'default' | 'success' | 'error' | 'warning';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  onClose?: () => void;
  children?: ReactNode;
}

const variantStyles: Record<ToastVariant, string> = {
  default: 'bg-background border-border',
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
};

export function Toast({ title, description, variant = 'default', onClose, children }: ToastProps) {
  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-md rounded-lg border shadow-lg',
        variantStyles[variant]
      )}
    >
      <div className="flex-1 p-4">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {description && (
          <p className={cn('text-sm', title && 'mt-1 opacity-90')}>{description}</p>
        )}
        {children}
      </div>
      {onClose && (
        <div className="flex border-l border-inherit">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 rounded-r-lg hover:bg-black/5 transition-colors"
            aria-label="Close"
          >
            <span className="text-lg">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Toast;
