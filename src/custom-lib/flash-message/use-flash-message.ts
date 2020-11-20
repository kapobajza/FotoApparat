import { useContext } from 'react';

import FlashMessageContext from './context';
import { FlashMessageContextType, MessageError } from './types';

export default function () {
  const context = useContext(FlashMessageContext);
  const contextValue: FlashMessageContextType = {
    showError: (message: MessageError) => context.showError(message),
    showSuccess: (message: string) => context.showSuccess(message),
    showInfo: (message: string) => context.showInfo(message),
  };

  return contextValue;
}
