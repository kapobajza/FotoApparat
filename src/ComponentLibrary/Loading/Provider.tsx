import React, { ReactNode, useState } from 'react';

import LoadingContext from './context';
import { LoadingContextType } from './types';
import Loading from './Loading';

interface Props {
  children: ReactNode;
}

const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [contextValue, setContextValue] = useState<LoadingContextType>({
    startLoading: () => {},
    stopLoading: () => {},
    isLoading: false,
  });

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <Loading setContextValue={setContextValue} />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
