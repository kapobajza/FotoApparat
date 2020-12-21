import { useContext } from 'react';

import ModalContext from './context';
import { ModalContextType } from './types';

const useModal = () => {
  const context = useContext(ModalContext);
  const contextValue: ModalContextType = {
    openModal: context.openModal,
    closeModal: context.closeModal,
  };

  return contextValue;
};

export default useModal;
