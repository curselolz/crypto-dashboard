import { toast } from 'react-toastify';

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: false,
  });
};

export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
