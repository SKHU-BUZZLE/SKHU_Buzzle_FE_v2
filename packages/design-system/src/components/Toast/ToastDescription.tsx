import { twMerge } from 'tailwind-merge';

import type { ToastComponentProps } from './types';

export default function ToastDescription({ children, className }: ToastComponentProps) {
  return <p className={twMerge('ds-typ-body-2 w-fit', className)}>{children}</p>;
}
