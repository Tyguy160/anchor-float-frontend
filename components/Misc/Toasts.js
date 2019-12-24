import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

const successMessage = message => {
  toast.success(message, {
    className: css({
      backgroundColor: 'green',
      borderRadius: '2px',
    }),
  });
};

const warnMessage = message => {
  toast.warn(message, {
    className: css({
      borderRadius: '2px',
    }),
  });
};

const errorMessage = message => {
  toast.error(message, {
    className: css({
      borderRadius: '2px',
    }),
  });
};

const infoMessage = message => {
  toast.info(message, {
    className: css({
      borderRadius: '2px',
    }),
  });
};

const toasts = { successMessage, warnMessage, errorMessage, infoMessage };

module.exports = toasts;
