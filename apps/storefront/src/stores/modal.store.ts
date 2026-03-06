/**
 * Modal Store
 * Modal/dialog state management with Zustand
 */

import { create } from 'zustand';

type ModalType =
  | 'login'
  | 'register'
  | 'cart'
  | 'search'
  | 'quickView'
  | 'sizeGuide'
  | 'newsletter'
  | 'confirmation'
  | null;

interface ModalData {
  productId?: string;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  [key: string]: unknown;
}

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  data: ModalData | null;
}

interface ModalActions {
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
  setModalData: (data: ModalData) => void;
}

type ModalStore = ModalState & ModalActions;

const initialState: ModalState = {
  isOpen: false,
  type: null,
  data: null,
};

export const useModalStore = create<ModalStore>((set) => ({
  ...initialState,

  openModal: (type, data) =>
    set({
      isOpen: true,
      type,
      data: data ?? null,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      data: null,
    }),

  setModalData: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),
}));

// Selectors
export const selectIsModalOpen = (state: ModalStore) => state.isOpen;
export const selectModalType = (state: ModalStore) => state.type;
export const selectModalData = (state: ModalStore) => state.data;

// Helper hooks
export const useModal = () => {
  const { openModal, closeModal, isOpen, type, data } = useModalStore();
  return { openModal, closeModal, isOpen, type, data };
};
