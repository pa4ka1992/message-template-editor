import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return { isModalOpen, modalHandler };
};
