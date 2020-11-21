import { LoadingContextType } from './types';

export default class LoadingState {
  static state: LoadingContextType = {
    startLoading: () => {},
    stopLoading: () => {},
  };

  static init(state: LoadingContextType) {
    this.state = state;
  }

  static startLoading() {
    this.state.startLoading();
  }

  static stopLoading() {
    this.state.stopLoading();
  }
}
