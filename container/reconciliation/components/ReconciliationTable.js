'use client'
import { formatToCurrency } from '@/lib/currency';
import React from 'react'

const ReconciliationTable = ({reconData, keys, keyTitles, ledgerArr, handleCheckedTran, toggleChecked, handleToggleCheck}) => {
    
    const keyArrs = keys?.map((key)=> keyTitles[key].title);

  return (
    <div>
        <div className="overflow-x-auto h-[40vh] resize-y">
            <table className="table table-xs table-pin-rows" table-pin-rows >
                <thead className=''>
                <tr className='text-blue-700 font-bold bg-gray-300'>
                    <th></th>
                   
                    <th>
                        <input type="checkbox" className="checkbox  border border-blue-500 bg-white"
                                onChange={handleToggleCheck} checked={toggleChecked === true}/>
                    </th>
                    {
                        keyArrs?.map((dt, i)=>{
                            return(
                                <th key={`${i}keysParent`} className='py-3'>{dt}</th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody className='overflow-auto'>
                

                {
                    ledgerArr?.map((dt, i)=>{
                        return(
                        <tr key={`${i}keyChild`} className={`text-blue-900 ${dt.checked? 'bg-teal-100' : ''}`}>
                            <th>{i+1}</th>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox border border-blue-500 bg-white"
                                     onChange={()=>handleCheckedTran(dt, i)} checked={dt.checked === true}/>
                                </label>
                            </th>
                            {
                                keys?.map((ky, id)=>{
                                    let val = dt[ky];
                                    if(ky === "debit" || ky === "credit"){
                                      if(parseFloat(val)) val = formatToCurrency(parseFloat(val), 2);
                                    }
                                    return(
                                        <td key={`${id}keys`} className='text-blue-900'>
                                           {val}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ReconciliationTable