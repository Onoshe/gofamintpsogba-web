import React from 'react'


const Selections = ({name, title, data, contStyle, required, disable, defaultValue, domain,hideDomain, onChange}) => {


  return (
    <div className={`border relative border-gray-600 p-3 pt-5 pb-7 rounded-md text-[13px] text-gray-700
      w-full mb-3 ${disable? 'bg-[#fee]' :'bg-[#eee]'} ${contStyle}`}>
          <p className='ml-1 mb-3'>{title}</p>
            <div className='flex flex-row flex-wrap justify-between md:justify-between'>
              <select className=' cursor-pointer flex flex-row items-center gap-2 shadow-md p-3 w-full'
                name={name}
                defaultValue={defaultValue}
                required={required}
                onChange={disable? ()=>console.log('') : (el)=>onChange(el)}
                >
                  {
                    data?.map((el, i)=>{
                      return(
                            <option 
                              key={`${i}key`}
                              className=''
                              name={el.name}
                              value={el.value}
                            >
                              {el.title}
                            </option>
                      )
                    })
                  }
                </select>
                <div 
                  className={`bg-gray-100 w-full mt-3 py-3 border ${hideDomain? 'hidden' : 'flex'} flex-row flex-wrap border-gray-300 rounded-md px-3 outline-none active:outline-none shadow-md`}
                    >
                      {domain? domain : "--"} as domain for {domain? domain?.toUpperCase() : '--' }@firstname.lastname
                </div>
            </div>
      </div>
  )
}
export default Selections