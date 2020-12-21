import React, { ReactNode, useState } from 'react';

import ModalContext from './context';
import { ModalContextType, StackType } from './types';
import Modal from './Modal';

interface Props {
  children: ReactNode;
  stack: StackType;
}

const ModalProvider: React.FC<Props> = ({ children, stack }) => {
  const [contextValue, setContextValue] = useState<ModalContextType>({
    openModal: () => {},
    closeModal: () => {},
  });

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal stack={stack} setContextValue={setContextValue} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
