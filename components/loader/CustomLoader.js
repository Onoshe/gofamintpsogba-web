import React from 'react';
//import ClipLoader from 'react-spinners/ClipLoader';

const CustomLoader = ({loadingMsg, color,size, textCol, loading, contPad}) => {
  return (
    <div className={`justify-center items-center flex flex-col ${contPad || 'p-4'}`}>
        <div
          color={color || 'tomato'}
          loading={loading}
          size={size || 50}
          aria-label="Loading Spinner"
          data-testid="loader"
        >
        </div>
        <span className="loading loading-spinner text-primary"></span>
        <p style={{color:textCol || 'black'}}>{loadingMsg}</p>
      </div>
  )
}

export default CustomLoader;
