import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contextClass = {
	success: "bg-green-200 text-green-600",
	error: "bg-red-600",
	default: "bg-gray-300",
	warning: "bg-yellow-200 text-yellow-600",
};
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
				<ToastContainer
					toastClassName={({ type }) =>
						`${contextClass[type || "default"]
						} relative flex p-1 min-h-10 rounded-md justify-between bg-black overflow-hidden cursor-pointer mb-2`
					}
					bodyClassName={() => "flex text-sm font-white font-med block p-3"}
					position="bottom-right"
					pauseOnFocusLoss={false}
					closeOnClick
				/>
				<App />
		</Provider>
	</React.StrictMode>
);
