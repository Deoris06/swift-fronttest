import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessMessage = success => <div className="">{toast.success(success)}<ToastContainer /></div>;
export const showErrorMessage = error => <div className="">{toast.error(error)} <ToastContainer /></div>;
