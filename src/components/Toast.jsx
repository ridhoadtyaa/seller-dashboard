import { toast, ToastContainer } from "react-toastify";

const Toast = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
        />
    )
}

export const notifyType = (type, message) => {
    switch (type) {
        case 'success':
             toast.success(message, {
                 position: "top-center",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
             });
            break;
        case 'error':
             toast.error(message, {
                 position: "top-center",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: false,
                 draggable: true,
                 progress: undefined,
             });
            break;
        default:
            break;
    }
 };

 export default Toast;