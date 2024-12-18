import React from 'react'
import { ToastContainer, toast } from 'react-toastify';



const ToastCont = ({postErrorColor, type, msg, handleNotify}) => {
  //notify('success', 'Posting successfull');
  //console.log(handleNotify)
  const notify = (type, msg) => toast[type](msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    //transition: 'Bounce',
    });

React.useEffect(()=>{
  if(handleNotify){
    notify('success', 'Posting successfull');
  }
},[handleNotify, msg, type]);

  return (
    <div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            bodyClassName={postErrorColor}
          />
    </div>
  )
}

export default ToastCont