import React from 'react'

const ProductSelection = ({name, defaultValue, onChange, data}) => {
  return (
    <div>
         <select className='cursor-pointer flex flex-row items-center bg-white gap-2 shadow-md p-3 w-full'
                name={name}
                defaultValue={defaultValue}
                required
                onChange={onChange}
                >
                    {
                    data?.map((el, i)=>{
                        return(
                            <option 
                                key={`${i}key`}
                                className='bg-white'
                                name={el.category}
                                value={el.value}
                            >
                                {el.category}
                            </option>
                        )
                    })
                    }
            </select>
    </div>
  )
}

export default ProductSelection