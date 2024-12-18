import { toast } from 'react-toastify';


const toastNotify = (type, msg) => {
    let errorSound = new Audio('/errorSound.mp3');
    if(type == 'error'){errorSound.play();}

    toast[type](msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        //transition: 'Bounce',
    });
}

export {toastNotify}