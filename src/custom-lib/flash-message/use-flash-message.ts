import { useContext } from 'react';

import FlashMessageContext from './context';
import { FlashMessageContextType } from './types';

export default function () {
  const context = useContext(FlashMessageContext);
  const contextValue: FlashMessageContextType = {
    showError: (message: string) => context.showError(message),
    showSuccess: (message: string) => context.showSuccess(message),
    showInfo: (message: string) => context.showInfo(message),
  };

  return contextValue;
}
