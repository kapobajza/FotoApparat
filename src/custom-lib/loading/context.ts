import { createContext } from 'react';

import { LoadingContextType } from './types';

const LoadingContext = createContext<LoadingContextType>({
  startLoading: () => {},
  stopLoading: () => {},
  isLoading: false,
});

export default LoadingContext;
