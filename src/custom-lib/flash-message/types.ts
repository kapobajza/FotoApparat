export type MessageType = 'error' | 'success' | 'info' | null;

export interface MessageError {
  message: string | null | undefined;
}

export interface FlashMessageContextType {
  showError: (message: MessageError) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
}
