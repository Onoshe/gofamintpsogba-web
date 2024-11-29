import React from 'react';
import DropdownComponent, { CustomDropdownComponent } from './DropdownComponent';


const InputComponent = ({title, type, name, value, onChange, pholder, readOnly, required, contStyle, titleStyle, inputStyle, noWidth}) => {
  return (
    <div className={`flex flex-row justify-between text-sm md:text-base items-baseline ${noWidth? noWidth : 'sm:min-w-[350px] md:min-w-[400px] max-w-[450px]'} ${contStyle}`}>
        <p  className={`hidden border-b-2 text-sm shadow-sm px-3 pb-2 ${titleStyle}`}>{title} </p>
        <label className={`border-b-2 text-sm shadow-sm px-3 pb-2 ${titleStyle}`}>
            {title} <span className='text-[red] font-bold'>{required? '*' : ''}</span>
          </label>
        <input
            data-theme='winter'
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`border border-blue-400 outline-none px-1 md:px-2 rounded-[3px] ${noWidth? noWidth : 'w-[150px]  sm:w-[180px]'} active:bg-blue-50 focus:bg-blue-50 ${inputStyle}`} 
            placeholder={pholder}
            required={required}
            readOnly={readOnly}
            />
    </div>
  )
}


const TextAreaInputComponent = ({title, required, name, value, onChange, pholder,  contStyle, titleStyle, inputStyle}) => {
    return (
      <div className={`flex flex-row justify-between  text-sm md:text-base items-baseline sm:min-w-[350px] md:min-w-[400px] max-w-[450px] ${contStyle}`}>
          <p  className={`border-b-2 shadow-sm px-3 pb-2 ${titleStyle}`}>{title} </p>
          <textarea
              type="textarea"
              name={name}
              value={value}
              onChange={onChange}
              className={`border border-blue-400 outline-none px-1 md:px-2 rounded-[3px] w-[150px]  bg-transparent sm:w-[180px] ${inputStyle}`} 
              placeholder={pholder}
              required={required}
              >
            {value}
            </textarea>
      </div>
    )
  }


  const RadioInputComponent=({opt1, opt2, name, title, onChange, value,titleStyle, contStyle, inputStyle, noWidth, subTitle, required, isRequired})=>{
    function onChangeHandler(opt){
        const e = {target:{name, value:opt.target.value}};
        //setSelected(opt);
        onChange(e)
    }
  
    return(
        <div className={`flex flex-row  text-sm md:text-base justify-between items-baseline  ${noWidth? noWidth : 'sm:min-w-[350px] md:min-w-[400px] max-w-[450px]'} ${contStyle}`}>
            
            <label className={`border-b-2 shadow-sm px-3 pb-2 ${titleStyle}`}>
                {title} <span className='text-[red] font-bold'>{required? '*' : ''}</span>
             </label>
            <div className={`flex flex-row justify-end items-center ${noWidth? noWidth : 'w-[200px]'}`}>
              
              <input
                type='radio'
                name={opt1}
                value={opt1}
                checked={value === opt1}
                onChange={onChangeHandler} 
                className={`w-4 h-4 radio radio-primary cursor-pointer  ${inputStyle}`} 
                />
              <label className='mr-3 ml-1'>{opt1}</label>
              <input
                type='radio'
                name={opt2}
                value={opt2}
                checked={value === opt2}
                onChange={onChangeHandler}
                className={`w-4 h-4 radio radio-primary cursor-pointer  ${inputStyle}`} 
                />
                <label className='ml-1'>{opt2}</label>
            </div>
        </div>
    );
  }
  
  
  const SelectionTag=({optArr, title, name, onChange, value, required, selectStyle, contStyle, noWidth, titleStyle, isRequired})=>{
    //const [selected, setSelected] = useState("");
    const optsArr = optArr || [];
    
    function onChangeHandler(e){
      //setSelected(e.target.value);
      onChange(e)
    }
    return(
      <div className={`flex flex-row  text-sm md:text-base justify-between items-baseline  ${noWidth? noWidth : 'sm:min-w-[350px] md:min-w-[400px] max-w-[450px]'} ${contStyle}`}>
          <label className={`border-b-2 shadow-sm px-3 pb-2 ${titleStyle}`}>
            {title} <span className='text-[red] font-bold'>{required? '*' : ''}</span>
          </label>
              <select 
                  className={`border border-blue-400 py-2 px-1 md:px-2 w-[150px]  bg-transparent sm:w-[180px] ${selectStyle}`} 
                  value={value === "" || value == null? 'Select' : value} 
                  onChange={onChangeHandler} 
                  name={name} 
                  required={required}>
                    
                  {optsArr.map((item,index)=>{
                  //const val = item.toString().toLowerCase();
                 return (
                  <option key={`${index}+val`} value={item} defaultValue={item.includes("Select")? 'defaultValue' : ''}>{item}</option>                 
                  );
                })}
              </select>
        </div>
    );
  }
  
  

  
  export const SelectionTagNew =({noWidth, type, pholder, name, title, onChange, value,titleStyle, contStyle, inputStyle,  subTitle, required, 
    selectedOption, setSelectedOption, handleSelected, contStyleDropdown, groupValue, options, personalAcctType, noGroupValueMsg})=>{
    function onChangeHandler(opt){
        //const e = {target:{name, value:opt.target.value}};
        //onChange(e)
        handleSelected(opt.target.value);
    }
  
    return(
        <div className={`flex flex-row   text-sm md:text-base justify-between  ${noWidth? noWidth : 'sm:min-w-[350px] md:min-w-[400px] max-w-[450px]'} ${contStyle}`}>
            
            <div className={`border-b-2 shadow-sm px-3 pb-2 ${titleStyle} hover:tooltip-open tooltip tooltip-right`}
                data-tip={'To group the same '+personalAcctType+"'s account. Default is GENERAL"}>
                Group <span className='text-[red] font-bold'>{required? '*' : ''}</span>
             </div>
            <div className={`flex flex-col justify-end`}>
              <div className='flex flex-row gap-3 '>
                <div className='flex flex-row gap-[2px] items-center'>
                  <input
                  type='radio'
                  name="SELECT"
                  value="SELECT"
                  checked={groupValue === "SELECT"}
                  onChange={onChangeHandler} 
                  className={`w-[14px] h-[14px] radio radio-primary cursor-pointer  ${inputStyle}`} 
                  />
                  <label>Select</label>
                </div>
                <div className='flex flex-row gap-[2px] items-center'>
                  <input
                  type='radio'
                  name="NEW"
                  value="NEW"
                  checked={groupValue === "NEW"}
                  onChange={onChangeHandler} 
                  className={`w-[14px] h-[14px] radio radio-primary cursor-pointer  ${inputStyle}`} 
                  />
                  <label>New</label>
                </div>
              </div>
              <div>
                {groupValue === "NEW"?
                  <input
                    data-theme='winter'
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`border border-blue-400 outline-none rounded-[3px] p-[6px]`} 
                    placeholder={pholder}
                    //required={required}
                  />
                  :<CustomDropdownComponent
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    contStyle={contStyleDropdown}
                    options={options}
                    noGroupValueMsg={noGroupValueMsg}
                    />}
              </div>
            </div>
        </div>
    );
  }
  
  const CheckboxComponent=({label, name, title, checked, onChange, value,titleStyle, contStyle, inputStyle, noWidth, subTitle, required, isRequired})=>{
    function onChangeHandler(opt){
        const e = {target:{name, value:opt.target.value}};
        //setSelected(opt);
        onChange(e)
    }
  
    return(
        <div className={`flex flex-row  text-sm md:text-base justify-between items-baseline  ${noWidth? noWidth : 'sm:min-w-[350px] md:min-w-[400px] max-w-[450px]'} ${contStyle}`}>
            
            <label className={`border-b-2 shadow-sm px-3 pb-2 ${titleStyle}`}>
                {title} <span className='text-[red] font-bold'>{required? '*' : ''}</span>
             </label>
            <div className={`flex flex-row justify-end items-center ${noWidth? noWidth : 'w-[180px]'}`}>
              
              <input
                type='checkbox'
                name={name}
                //value={value}
                checked={checked}
                onChange={onChangeHandler}
                className={`w-5 h-5 checkbox checkbox-primary cursor-pointer  ${inputStyle}`} 
                />
              <label className='ml-3 text-[12px]'>{label}</label>
            </div>
        </div>
    );
  }
export {InputComponent, TextAreaInputComponent, RadioInputComponent, SelectionTag, CheckboxComponent}