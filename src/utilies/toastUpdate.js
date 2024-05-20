import { toast } from 'react-toastify';

const toastUpdate = (toastId, type, message, isLoading) => {
	toast.update(toastId, {
		render: () => message,
		type,
		autoClose: 3000,
		isLoading,
	});
}
export default toastUpdate;