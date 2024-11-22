import toast, { ToastOptions } from 'react-hot-toast';

interface Notify {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
}

const notify: Notify = (message: string, options?: ToastOptions) =>
  toast(message, options);

notify.success = (message: string, options?: ToastOptions) =>
  toast.success(message, options);
notify.error = (message: string, options?: ToastOptions) =>
  toast.error(message, options);
notify.loading = (message: string, options?: ToastOptions) =>
  toast.loading(message, options);

export { notify };
