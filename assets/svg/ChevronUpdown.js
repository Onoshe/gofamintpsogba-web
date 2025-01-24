import React from 'react'


const ChevronUpdown = ({size, fill, onClick, className, name,}) => {
    const down = "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z";
    const up = "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z";
    const plus = "M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z";
    const minus = "M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z";

    const names = {down, up,plus, minus};

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width={size? size : 16} 
                height={size? size : 16}
                viewBox="0 0 16 16" 
                fill={fill} 
                className={className}
                onClick={onClick} 
                >
                <path fillRule="evenodd" d={names[name]}/>
            </svg>
        </>
  )
}

export default ChevronUpdown

//d={name==="down"? down : up}