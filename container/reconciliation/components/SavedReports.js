import { formatToCurrency } from '@/lib/currency';
import React from 'react'
import { MdCancel, MdClose, MdDelete } from 'react-icons/md';


const SavedReports = ({formOthers, reportCont, setReportCont, setFormOthers, setReconOthers, data}) => {
    const reconOthers = {};
    
   
   const handleSelected =(el, i, act)=>{
    
    const reportObj = JSON.parse(el.text1);
    //console.log(act, el, reportObj);
   }

   const handleHide =()=>{
    setReconOthers({...reconOthers, show:false});
   }
 
   const handleOnOkay =()=>{
        handleHide();
   }

    return (
    <div className={`absolute w-full z-50 justify-center top-[120px] flex items-center ${reportCont.show? '' : 'hidden'}`}>
        <div className='bg-white h-fit  w-full max-w-[450px] relative shadow-lg'>
            <p className='bg-blue-500 p-2 text-center text-white'>Others Reconciliation</p>
            <MdClose className='absolute right-4 top-2 text-white hover:text-red-600 active:text-red-100 cursor-pointer' size={22}
                onClick={()=>setReportCont({...reportCont, show:false})}/>
            <div className='p-2 text-sm'>
                
                <div className='text-[13px] flex flex-col  border border-gray-200 m-2 p-2 h-[30vh] overflow-auto'>
                    {
                        data?.data?.map((dt, i)=>{
                            let by = dt?.updatedBy?.split("@")[1];
                            by = by.split(".");

                            return(
                                <div key={`${i}key`} className='flex text-gray-600 flex-row px-3 py-1 bg-blue-50 mb-2 hover:bg-blue-100 cursor-pointer active:bg-blue-50'
                                onClick={()=>handleSelected(dt, i, "SELECT")}> 
                                    <div className='flex flex-row justify-between flex-1'>
                                        <p>{dt.name}</p>
                                        <p>{dt.reconDate}</p>
                                        <p>by {by[1]}</p>
                                    </div>
                                    <MdDelete className='text-red-500 ml-2 cursor-pointer hover:text-red-600 active:text-red-400'
                                     onClick={()=>handleSelected(dt, i, "DELETE")}/>
                                    
                                </div>
                            )
                        })
                    }
                </div>
               
            </div>

        </div>
    </div>
  )
}

export default SavedReports