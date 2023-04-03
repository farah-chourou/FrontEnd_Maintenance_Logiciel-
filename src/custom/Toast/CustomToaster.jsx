import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function CustomToaster(props) {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={200}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default CustomToaster;
