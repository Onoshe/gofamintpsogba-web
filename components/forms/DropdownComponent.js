'use client';
import React, {useState} from "react";
import { BiCaretDown } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const DropdownComponent = ({selectedOption, setSelectedOption, contStyle, hideCont, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState('auto');
  //const [selectedOption, setSelectedOption] = React.useState(null);
  const value = selectedOption;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    { value: 30, label: '30 Days' },
    { value: 61, label: '61 Days' },
    { value: 121, label: '121 Days' },
    { value: 182, label: '182 Days' },
    { value: 365, label: '365 Days' },
  ];
  
  React.useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.dropdown-custom')) {
         setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    },[]);

    React.useEffect(() => {
      if (isOpen) {
        const dropdownRect = document.querySelector('.dropdown-custom ul').getBoundingClientRect();
        const viewportHeight = window.innerHeight;
  
        if (dropdownRect.bottom > viewportHeight) {
          setDropdownTop(0);
        } else {
          setDropdownTop('auto');
        }
      }
    }, [isOpen]);
  // className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  
  return (
    <div className={`${hideCont? 'hidden' : 'flex'} justify-center items-center ${contStyle}`}>
        <div className="relative dropdown-custom text-gray-800 ">
            
            <label className="input border-gray-400 h-[40px] flex items-center gap-2 cursor-pointer bg-white">
                <p type="button" className="text-sm grow cursor-pointer outline-none active:outline-none focus:outline-none" 
                    value={value?.value? value.label : "--Select--"}
                    onClick={handleToggle}>
                        {value?.value? value.label : "--Select--"}
                </p>

                <MdOutlineKeyboardArrowDown size={24} onClick={handleToggle}/>
            </label>

            {isOpen && (
                <ul
                className="absolute mt-2 bg-white rounded-md shadow-lg border max-h-[200px] overflow-y-auto border-gray-500 z-10"
                style={{
                  minWidth: '120px',
                  top: dropdownTop,
                  bottom: dropdownTop === 0 ? 'auto' : 40,
                }}
                >
                {options.map((option) => (
                    <li
                    key={option.value}
                    className="px-4 py-1 hover:bg-gray-100 cursor-pointer text-[12px]"
                    onClick={() => handleOptionClick(option)}
                    >
                    {option.label}
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
};



export const CustomDropdownComponent = ({options, selectedOption, setSelectedOption, contStyle,contInStyle, 
  hideCont, noGroupValueMsg}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState('auto');
  //const [selectedOption, setSelectedOption] = React.useState(null);
  const value = selectedOption;

  const handleToggle = () => {
    if(!options?.length){
      setIsOpen(false)
    }else{setIsOpen(!isOpen);}
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.dropdown-custom')) {
         setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    },[]);


    React.useEffect(() => {
      if (isOpen) {
        const dropdownRect = document.querySelector('.dropdown-custom ul').getBoundingClientRect();
        const viewportHeight = window.innerHeight;
  
        if (dropdownRect.bottom > viewportHeight) {
          setDropdownTop(0);
        } else {
          setDropdownTop('auto');
        }
      }
    }, [isOpen]);
  // className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  
  return (
    <div className={`${hideCont? 'hidden' : 'flex'} justify-center items-center ${contStyle}`}>
        <div className="relative dropdown-custom text-gray-800 ">
            
            <label className="input border-gray-400 h-[40px] flex items-center gap-2 cursor-pointer bg-white">
                <p type="button" className={`text-sm w-[100px] grow cursor-pointer outline-none active:outline-none focus:outline-none ${contInStyle}`} 
                    value={value?.value? value.label : noGroupValueMsg}
                    onClick={handleToggle}>
                        {value?.value? value.label : noGroupValueMsg}
                </p>

                <MdOutlineKeyboardArrowDown size={24} onClick={handleToggle}/>
            </label>

            {isOpen && (
                <ul
                className="absolute mt-2 bg-white rounded-md shadow-lg border max-h-[200px] overflow-y-auto border-gray-500 z-10"
                style={{
                  minWidth: '120px',
                  top: dropdownTop,
                  bottom: dropdownTop === 0 ? 'auto' : 40,
                }}
                >
                {options?.map((option) => (
                    <li
                    key={option?.value}
                    className="px-4 py-1 hover:bg-gray-100 cursor-pointer text-[12px]"
                    onClick={() => handleOptionClick(option)}
                    >
                    {option.label}
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
};


export default DropdownComponent