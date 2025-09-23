export interface ToastComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ToastCloseProps extends ToastComponentProps {
  onClose?: () => void;
  className?: string;
  color?: string;
}

export type ToastType = 'default' | 'success' | 'error' | 'info';

export interface ToastOptions {
  title?: string;
  description: string;
  type?: ToastType;
  duration?: number;
}

export interface ToastStyles {
  className?: string;
  icon?: React.ReactNode;
  color?: string;
}
