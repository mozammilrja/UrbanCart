'use client';

import { create } from 'zustand';
import type { ReactNode } from 'react';

interface ModalConfig {
  id: string;
  content: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
}

interface ModalStore {
  modals: ModalConfig[];
  openModal: (config: ModalConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  getTopModal: () => ModalConfig | undefined;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],

  openModal: (config) => {
    set((state) => ({
      modals: [...state.modals, config],
    }));
  },

  closeModal: (id) => {
    const modal = get().modals.find((m) => m.id === id);
    if (modal?.onClose) {
      modal.onClose();
    }
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    }));
  },

  closeAllModals: () => {
    get().modals.forEach((modal) => {
      if (modal.onClose) {
        modal.onClose();
      }
    });
    set({ modals: [] });
  },

  getTopModal: () => {
    const { modals } = get();
    return modals[modals.length - 1];
  },
}));
