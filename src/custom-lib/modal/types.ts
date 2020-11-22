import { ComponentType } from 'react';

export interface ModalContextType {
  openModal: (name: string, params?: any) => void;
  closeModal: () => void;
}

export interface ModalPropType {
  getParam: (name: string, fallback: any) => any;
  closeModal: () => void;
}

export interface ModalComponentPropsType {
  modal: ModalPropType;
}

export interface StackType {
  [key: string]: ComponentType<ModalComponentPropsType>;
}
