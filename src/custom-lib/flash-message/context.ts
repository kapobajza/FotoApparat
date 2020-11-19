import React from 'react';

import { FlashMessageContextType } from './types';

const FlashMessageContext = React.createContext<FlashMessageContextType>({
  showError: () => {},
  showSuccess: () => {},
  showInfo: () => {},
});

export default FlashMessageContext;
