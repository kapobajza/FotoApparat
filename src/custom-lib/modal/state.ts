import { ModalContextType } from './types';

export default class ModalState {
  static state: ModalContextType = {
    closeModal: () => {},
    openModal: () => {},
  };

  static init(state: ModalContextType) {
    this.state = state;
  }

  static openModal(name: string, params: any) {
    this.state.openModal(name, params);
  }

  static closeModal() {
    this.state.closeModal();
  }
}
