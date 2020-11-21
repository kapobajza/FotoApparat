import React, { ReactNode, useState } from 'react';

import LoadingContext from './context';
import { LoadingContextType } from './types';
import Loading from './loading';

interface Props {
  children: ReactNode;
}

const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [contextValue, setContextValue] = useState<LoadingContextType>({
    startLoading: () => {},
    stopLoading: () => {},
  });

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <Loading setContextValue={setContextValue} />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
