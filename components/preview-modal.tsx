'use client';

import usePreviewModal from '@/hooks/use-preview-modal';
import Info from '@/components/info';
import Modal from '@/components/ui/modal';
import Image from 'next/image';

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
            <Image
              src={product.img}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
