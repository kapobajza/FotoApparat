import React, { ReactNode, useState } from 'react';

import FlashMessageContext from './context';
import { FlashMessageContextType } from './types';
import FlashMessage from './FlashMessage';

interface Props {
  children: ReactNode;
  timeout?: number;
}

const FlashMessageProvider: React.FC<Props> = ({ children, timeout = 6000 }) => {
  const [contextValue, setContextValue] = useState<FlashMessageContextType>({
    showError: () => {},
    showSuccess: () => {},
    showInfo: () => {},
  });

  return (
    <FlashMessageContext.Provider value={contextValue}>
      {children}
      <FlashMessage setContextValue={setContextValue} timeout={timeout} />
    </FlashMessageContext.Provider>
  );
};

FlashMessageProvider.defaultProps = {
  timeout: 6000,
};

export default FlashMessageProvider;
