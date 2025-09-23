import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { twMerge } from 'tailwind-merge';

import { ErrorIcon, SuccessIcon } from '../icons';
import ToastDescription from './ToastDescription';
import type { ToastOptions, ToastStyles, ToastType } from './types';

const toastStyleByType: Record<ToastType, ToastStyles> = {
  success: {
    icon: <SuccessIcon className='size-20' />,
    className: 'bg-white-50 dark:bg-dm-black-700 border-1 ds-theme-border-base text-correct-green-500',
    color: '#15c47e',
  },
  error: {
    icon: <ErrorIcon className='size-20' />,
    className: 'bg-white-50 dark:bg-dm-black-700 border-1 ds-theme-border-base text-error-red-500',
    color: '#f04452',
  },
  info: {
    className: 'bg-white-50 dark:bg-dm-black-700 border-1 ds-theme-border-base text-primary-500',
  },
  default: {
    className: 'bg-white-50 dark:bg-dm-black-700 border-1 ds-theme-border-base ds-text-normal',
  },
};

export const useToast = () => {
  const toastRoot = useRef<ReactDOM.Root | null>(null);

  const toast = ({ description, type = 'default', duration = 3000 }: ToastOptions) => {
    if (toastRoot.current) {
      toastRoot.current.unmount();
      toastRoot.current = null;
    }

    const node = document.getElementById('wt-toast');
    if (!node) return;

    const statusStyle = toastStyleByType[type];

    const ToastWrapper = () => {
      const [isVisible, setIsVisible] = useState(true);

      useEffect(() => {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, duration);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={twMerge(
                'fixed top-28 left-1/2 z-80 flex w-320 -translate-x-1/2 items-center justify-center gap-12 rounded-[999px] p-10 text-white shadow-[0px_4px_20px_5px_rgba(0,0,0,0.07)] dark:shadow-[0px_4px_25px_5px_rgba(255,255,255,0.1)]',
                statusStyle.className,
              )}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => {
                if (!isVisible) {
                  toastRoot.current?.unmount();
                }
              }}
            >
              {statusStyle.icon && <span className='pl-12'>{statusStyle.icon}</span>}
              <div className='flex flex-col'>
                <ToastDescription>{description}</ToastDescription>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    toastRoot.current = ReactDOM.createRoot(node);
    toastRoot.current.render(<ToastWrapper />);
  };

  return { toast };
};

export const Toaster = () => {
  return <div id='wt-toast' />;
};
