import { create } from 'zustand';

import { FormattedProduct } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: FormattedProduct;
  onOpen: (data: FormattedProduct) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: FormattedProduct) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
