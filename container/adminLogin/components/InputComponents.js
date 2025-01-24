import React, {useState,} from 'react';
import {BsCheck} from 'react-icons/bs';


const TextInput=({title,subTitle, placeholder, type, value, onClick,titleStyle,
    onChange, required, name, autoComplete, contStyle, inputStyle})=>{
    
    return(
        <div className={`mx-3 mb-3 ${contStyle}`}>
            <label className={`form-check-label font-bold block pl-2 ${titleStyle? titleStyle : 'text-[teal]'}`}
                >
                {title}
                <span className='text-gray-500 text-[12px]'>{subTitle}</span>
            </label>
            <input className={`form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                 bg-clip-padding
                border border-solid border-gray-300
                transition
                ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-blue-600 
                focus:outline-none
                ${inputStyle}`}
                 type={type? type : "text"} 
                 placeholder={placeholder}
                 value={value}
                 onChange={onChange}
                 onClick={onClick}
                 required= {required || ""}
                 name={name}
                 autoComplete={autoComplete || ""} 
                />
        </div>
    );
}



const RadioButtonsCustom=({opt1, opt2, name, title, onChange, value})=>{
  const [selected, setSelected] = useState('');
  //const ev = {target:{name:selected, value:selected}};
  function onChangeHandler(opt){
      //setChecked(opt);
      //onChange(e, opt)
      const e = {target:{name:name, value:opt, type:'radioSpec'}};
      setSelected(opt);
      onChange(e)
  }

  return(
      <div className='mx-3 mb-3 block  '>
        <label className="font-bold block text-[teal] pl-2"
        >
            {title}
        </label>
        <div className='flex flex-col xsmc:flex-row pl-1
            px-3
            py-2.5
            text-base
            font-normal
            text-gray-700
            bg-mainColor bg-clip-padding
            border border-solid border-gray-300'>
          <div className='flex items-center px-2'>
            <div className={`scale-[1.1] ${selected===opt1? 'border-sky-500 bg-sky-100' : 'border-gray-400 bg-white'} w-4 h-4 p-[2px] active:bg-white cursor-pointer border-2 border-solid  rounded-full  flex justify-center`}
              onClick={()=>onChangeHandler(opt1)}
              name={name}
              type="cRadio"
              value={opt1}>
              <div className={`${selected===opt1 && 'bg-sky-500 hover:bg-[mediumblue]'} w-2 h-2 rounded-full active:bg-white  flex justify-center`}/>
            </div>
            <label className='pl-2 pr-5'>{opt1}</label>
          </div>

          <div className='flex items-center'>
            <div className={`scale-[1.1] ${selected===opt2? 'border-sky-500 bg-sky-100' : 'border-gray-400 bg-white'} w-4 h-4 p-[2px] active:bg-white cursor-pointer border-2 border-solid rounded-full flex justify-center`}
             onClick={()=>onChangeHandler(opt2)}
              name={name}
              type="cRadio"
              value={opt2}>
                <div className={`${selected===opt2 && 'bg-sky-500 hover:bg-[mediumblue]'} w-2 h-2 rounded-full active:bg-white  flex justify-center`}/>
              </div>
              <label className='pl-2'>{opt2}</label>
            </div>
        </div>
    </div>
  );
}


const SelectionTag=({optArr, title, name, onChange})=>{
  const [selected, setSelected] = useState("");
  const optsArr = optArr || [];
  
  function onChangeHandler(e){
    setSelected(e.target.value==="Select"? "" 
      : e.target.value );
    onChange(e);
  }
  return(
      <div className='mx-3 mb-3 block '>
        <label className="font-bold block text-[teal] h pl-2">{title}</label>
            <select 
                className="w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-mainColor bg-clip-padding
                border border-solid border-gray-300
                transition
                ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-blue-600 
                focus:outline-none" 
                value={selected} onChange={onChangeHandler} name={name} >
              {optsArr.map((item,index)=>{
                //const val = item.toString().toLowerCase();
               return (
                <option key={`${index}+val`} value={item}>{item}</option>                 
                );
              })}
            </select>
      </div>
  );
}

const Fileupload=({value, onChange, required, name, inputRef, show})=>{
    function onFileSelection(e){
        onChange(e)
      }
  return(
    <div className="
        mx-3
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-mainColor bg-clip-padding
        border border-solid border-gray-300
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 
        focus:outline-none">
      <input
        type="file"
        value={value}
        onChange={onFileSelection}
        required= {"" || required}
        name={name}
        ref={inputRef}
        hidden= {show}
        accept="image/png, image/jpg, image/jpeg"
      />
    </div>
  );
}

const FileuploadCustom=({title,onFileSelection, name, uploadMsg})=>{
  const inputRef = React.useRef(null);

  return(
      <div className='mx-3 mb-3 block '>
        <label className='font-bold block  text-[teal] pl-2'>{title}</label>
        <div className='flex flex-wrap'>
           <h1 className="px-6 w-fit py-1 rounded bg-mainColor border-2 border-gray-400 border-solid hover:text-white hover:bg-slate-600  text-black cursor-pointer" 
               onClick={()=>inputRef.current.click()}
               name={name} 
              >
            Select Photo
            </h1>
            <label className="pl-3">{uploadMsg}</label>
          </div>
            <input
                type="file"
                onChange={onFileSelection}
                name="photo"
                ref={inputRef}
                hidden= {true}
                />
            
      </div>
  );
}

const AddInfoButton=({title, addSpouse,addChild, onClickAddInfo, 
     deActivateSpouseBtn})=>{

  return(
      <div className="mx-3 mb-3">
          <label className="form-check-label block font-bold text-[teal] pl-2"
              >{title}</label>
          <div className='flex mx2 flex-wrap'>
          <div className={`
                flex
                mr-3
                justify-center
                text-center
                px-4
                py-2
                text-base
                font-normal
                border-solid border-gray-300
                border-2 rounded-lg
                min-w-[100px]  
                ${deActivateSpouseBtn? 'bg-stone-300 text-[#3d3b3b]' : 
                  'text-white cursor-pointer bg-blue-700 hover:bg-[blue] active:bg-gray-300'}
                `}
                onClick={()=>onClickAddInfo('SPOUSE')}
                >{addSpouse}</div>
                
                <div className="
                min-w-[100px]
                flex
                justify-center
                text-center
                px-4
                py-2
                text-base
                font-normal
                text-white
                bg-blue-700
                border-solid border-gray-300
                border-2 rounded-lg 
                hover:bg-[blue]
                active:bg-gray-300 
                cursor-pointer"
                onClick={()=>onClickAddInfo('CHILD')}
                >{addChild}</div>
          </div>
      </div>
  );
}




  const TextAreaInput=({title,subTitle, placeholder, type, value, 
    onChange, required, name, autoComplete, rowsNo, resizeY})=>{
    
    return(
        <div className="mx-3 mb-3">
            <label className="form-check-label font-bold block  text-[teal] pl-2"
                >
                {title}
                <span className='text-gray-500 text-[12px]'>{subTitle}</span>
            </label>
              <textarea
                  className={`
                      form-control
                      block
                      w-full
                      px-3
                      py-2
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      bg-mainColor bg-clip-padding
                      focus:text-gray-700 focus:bg-white 
                      focus:border-blue-600 focus:outline-none
                      ${resizeY? 'resize-y' : ''}
                      `}
                  rows={rowsNo? rowsNo : "7"}
                  type={type? type : "text"} 
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  required= {"" || required}
                  name={name}
                  autoComplete={"" || autoComplete} 
                ></textarea>
        </div>
    );
}
export {TextInput, SelectionTag, Fileupload, 
  FileuploadCustom, AddInfoButton, RadioButtonsCustom, TextAreaInput}