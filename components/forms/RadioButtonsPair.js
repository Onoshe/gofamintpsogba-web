import React from 'react';
import { BsQuestionCircle,} from 'react-icons/bs';



const RadioButtonsPair = ({btn1Name, btn1Title, btn2Name, btn2Title,btn1Tooltip,btn2Tooltip, classNameCont, checkedBtn, setCheckedBtn}) => {
  return (
        <div className={`flex gap-3 ${classNameCont}`}>
            <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="w-fit text-info flex flex-row flex-wrap items-center gap-2">
                    <input type="radio" 
                        name={btn1Name} className="w-5 h-5 radio radio-primary" 
                        checked={checkedBtn === btn1Name}
                        onChange={()=>setCheckedBtn(btn1Name)}
                        />
                    <p className='text-gray-800 pr-3'>{btn1Title}</p>
                    <BsQuestionCircle size={20} className={`${btn1Tooltip? "" : "hidden"}`}/>
                </label>
                <div tabIndex={0} className={`${btn1Tooltip? '' : 'hidden'} border border-[lime] p-2 sm:p-4 compact dropdown-content z-[1] shadow-lg bg-white rounded-md w-64`}>
                    {btn1Tooltip}
                </div>
            </div>
            <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="w-fit text-info flex flex-row flex-wrap items-center gap-2">
                    <input type="radio" 
                        name={btn2Name} className="w-5 h-5 radio radio-primary" 
                        checked={checkedBtn === btn2Name}
                        onChange={()=>setCheckedBtn(btn2Name)}/>
                    <p className='text-gray-800 pr-3'>{btn2Title}</p>
                    <BsQuestionCircle size={20} className={`${btn2Tooltip? "" : "hidden"}`}/>
                </label>
                <div tabIndex={0} className={`${btn2Tooltip? '' : 'hidden'} border border-[lime] p-2 sm:p-4 compact dropdown-content z-[1] shadow-lg bg-white rounded-md w-64`}>
                {btn2Tooltip}
                </div>
            </div>
        </div>
  )
}


const RadioButtonSingle = ({btnName, btnTitle, btnTooltip, classNameCont, checkedBtn, setCheckedBtn}) => {
    return (
          <div className={`flex gap-3 ${classNameCont}`}>
              <div className="dropdown dropdown-bottom">
                  <label tabIndex={0} className="w-fit text-info flex flex-row flex-wrap items-center gap-2">
                      <input type="radio" 
                          name={btnName} className="w-5 h-5 radio radio-primary" 
                          checked={checkedBtn === btnName}
                          onChange={()=>setCheckedBtn(btnName)}
                          />
                      <p className='text-gray-800 pr-3'>{btnTitle}</p>
                      <BsQuestionCircle size={20} className={`${btnTooltip? "" : "hidden"}`}/>
                  </label>
                  <div tabIndex={0} className={`${btnTooltip? '' : 'hidden'} border border-[lime] p-2 sm:p-4 compact dropdown-content z-[1] shadow-lg bg-white rounded-md w-64`}>
                      {btnTooltip}
                  </div>
              </div>
          </div>
    )
  }
  

export {RadioButtonsPair, RadioButtonSingle}