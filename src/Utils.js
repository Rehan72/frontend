import toast from "react-hot-toast";

// Helper function to trigger toast notifications
export const showToast = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast(message); // info will use the default toast
      break;
    default:
      toast(message); // Default behavior
  }
};

