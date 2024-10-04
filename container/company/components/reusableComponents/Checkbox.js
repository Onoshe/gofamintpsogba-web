import React from 'react'


const Checkbox = ({title, form, data, contStyle, disable,  onChange}) => {

  return (
    <div className={`border relative border-gray-600 p-3 py-5 rounded-md text-[13px] text-gray-700
      w-full mb-3 ${disable? 'bg-[#fee]' :'bg-[#eee]'} ${contStyle}`}>
          <p className='ml-1'>{title}</p>
            <div className='flex flex-row flex-wrap justify-between md:justify-between'>
                {
                  data?.map((el, i)=>{
                    return(
                      <div key={`${i}key`} className='flex flex-row items-center gap-2 p-3 w-[230px]'>
                          <input type="checkbox" 
                            className='size-4 cursor-pointer'
                            onChange={disable? ()=>console.log('') : ()=>onChange(el)}
                            name={el.title}
                            checked={disable? false : form?.tables?.includes(el.title)}
                            value={el.title}
                            readOnly
                          />
                          <label>{el.title}</label>
                      </div>
                    )
                  })
                }
            </div>
            <div 
                className='bg-gray-100 w-full mt-3 py-4 border flex flex-row flex-wrap border-gray-300 rounded-md px-3 outline-none active:outline-none shadow-md'
            >[{disable? [] : form?.tables?.map((el,i)=>{
              return(
                <p key={`${i}key`}>{el}{i===form.tables.length-1? '' : ','}</p>
              )
            })}]</div>
      </div>
  )
}


export const CheckboxSingle = ({title, form, name, label, contStyle,   onChangeHandler}) => {

  return (
    <div className={`border relative border-gray-600 p-3 py-5 rounded-md text-[13px] text-gray-700
      w-full mb-3 bg-[#eee] ${contStyle}`}>
          <p className='ml-1'>{title}</p>
            <div className='flex flex-row flex-wrap justify-between md:justify-between'>
                <div className='flex flex-row items-center gap-2 p-3'>
                      <input type="checkbox" 
                        className='size-4 cursor-pointer'
                        onChange={onChangeHandler}
                        name={name}
                        checked={form[name]}
                        //value={form[name]}
                      />
                      <label className=''>{label}</label>
                  </div>
            </div>
      </div>
  )
}

export default Checkbox