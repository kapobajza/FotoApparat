import { useContext } from 'react';

import LoadingContext from './context';
import { LoadingContextType } from './types';

export default function () {
  const context = useContext(LoadingContext);
  const contextValue: LoadingContextType = {
    startLoading: context.startLoading,
    stopLoading: context.stopLoading,
    isLoading: context.isLoading,
  };

  return contextValue;
}
