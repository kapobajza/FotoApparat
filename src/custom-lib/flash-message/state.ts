import { FlashMessageContextType, MessageError } from './types';

// This is a centralized state, used to call FlashMessage outside of React components
export default class FlashMessageState {
  static state: FlashMessageContextType = {
    showError: () => {},
    showInfo: () => {},
    showSuccess: () => {},
  };

  static init(state: FlashMessageContextType) {
    this.state = state;
  }

  static showError(error: MessageError) {
    this.state.showError(error);
  }

  static showInfo(message: string) {
    this.state.showInfo(message);
  }

  static showSuccess(message: string) {
    this.state.showSuccess(message);
  }
}
