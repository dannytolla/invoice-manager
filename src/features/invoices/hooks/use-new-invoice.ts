import { create } from "zustand";

type NewInvoiceState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewInvoice = create<NewInvoiceState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
