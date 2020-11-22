import { createContext } from 'react';

import { ModalContextType } from './types';

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
