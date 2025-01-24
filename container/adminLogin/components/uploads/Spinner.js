import React from 'react';
import { BsCircleFill } from 'react-icons/bs';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <BsCircleFill
        type="Circles"
        color="#00BFFF"
        size={32}
        className="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
