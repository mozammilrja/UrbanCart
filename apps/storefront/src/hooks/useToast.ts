'use client';

/**
 * useToast Hook
 * Toast notification management
 */

import * as React from 'react';

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface ToastMessage {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToastMessage }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToastMessage> & { id: string } }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId?: string };

interface ToastState {
  toasts: ToastMessage[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function genId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function addToRemoveQueue(toastId: string, dispatch: React.Dispatch<ToastAction>) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: 'REMOVE_TOAST', toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;
      return {
        ...state,
        toasts: toastId
          ? state.toasts.filter((t) => t.id !== toastId)
          : [],
      };
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

// Global state
let memoryState: ToastState = { toasts: [] };
const listeners: Array<(state: ToastState) => void> = [];

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
}

function toast(options: ToastOptions) {
  const id = genId();

  const toastMessage: ToastMessage = {
    id,
    ...options,
  };

  dispatch({ type: 'ADD_TOAST', toast: toastMessage });

  // Auto dismiss
  setTimeout(() => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  }, options.duration || TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (props: Partial<ToastOptions>) =>
      dispatch({ type: 'UPDATE_TOAST', toast: { id, ...props } }),
  };
}

// Convenience methods
toast.success = (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) =>
  toast({ description, variant: 'success', ...options });

toast.error = (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) =>
  toast({ description, variant: 'error', ...options });

toast.warning = (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) =>
  toast({ description, variant: 'warning', ...options });

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { toast };
