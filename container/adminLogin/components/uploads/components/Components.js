import React from 'react'


const TextInput = ({onChangeHandler,errorKey, type, required, value, name, placeholder, inputStyle}) => {
  //"outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
  //console.log(errorKey);
  return (
        <input
            type={type}
            value={value}
            name={name}
            onChange={onChangeHandler}
            placeholder={placeholder}
            className={`outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 
              ${errorKey === name? "bg-pink-200" : ""}
              ${inputStyle}`}
            required={required}
            autoComplete="true"
        />
  )
}


const SelectionTag=({optArr,selectStyle,errorKey, defItem, name, onChange})=>{
  const [selected, setSelected] = React.useState(optArr[0]);
  const optsArr = optArr || [];
  
  function onChangeHandler(e){
    setSelected(e.target.value==="Select"? "" 
      : e.target.value );
    onChange(e);
  }
  return(
        <select
        className={`outline-none  text-gray-500 text-base sm:text-lg border-b-2 border-gray-200 p-2 
          ${errorKey === name? "bg-pink-200" : ""}  
          ${selectStyle}`}  
            value={selected} 
            onChange={onChangeHandler} 
            name={name} >
          
          {optsArr.map((item,index)=>{
            //const val = item.toString().toLowerCase();
            return (
            <option key={`${index}+val`} value={item}
              >{item}</option>                 
            );
          })}
        </select>
  );
}


const PostButton = ({onClickHandler}) => {
  return (
    <div className="flex justify-end items-end mt-5">
        <button
            type="button"
            onClick={onClickHandler}
            className="bg-teal-600 hover:bg-green-700 text-white font-bold p-2 rounded-full w-32 outline-none"
        >
        Save Upload
        </button>
    </div>
  )
}

const ResetButton = ({onClickHandler}) => {
  return (
    <div className="flex justify-end items-end mt-5 ml-4">
        <button
            type="button"
            onClick={onClickHandler}
            className="bg-red-500 text-white font-bold p-2 w-32 outline-none"
        >
        Reset Fields
        </button>
    </div>
  )
}


const UploadedImage =({src})=>{

  return(
      <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
          <img
            src={src}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="font-bold">{'user.userName'}</p>
        </div>
  );
}

export {TextInput, PostButton, UploadedImage, SelectionTag, ResetButton}
