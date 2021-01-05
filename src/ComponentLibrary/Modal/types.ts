import { ComponentType } from 'react';

export interface ModalContextType {
  openModal: <T>(name: string, params?: T) => void;
  closeModal: () => void;
}

export interface ModalPropType {
  getParam(name: string, fallback: any): any;
  closeModal(): void;
}

export interface ModalComponentPropsType {
  modal: ModalPropType;
}

export interface StackType {
  [key: string]: ComponentType<ModalComponentPropsType>;
}
