'use client'
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import { formatToCurrency } from '@/lib/currency';
import React from 'react'
import { MdCancel, MdClose, MdDelete } from 'react-icons/md';
import { deleteQueryRecon } from '../utils/reconQuery';
import { patchRequest } from '@/lib/apiRequest/patchRequest';


const SavedReports = ({ reportCont, setReportCont, savedReportView, setSavedReportView, 
    setReconOthers, data, displayReport, setDisplayReport, user, mutate, notify}) => {
    const reconOthers = {};
    const [selectedRep, setSelectedRep] = React.useState({el:{}, i:0, act:""}); 
    const [showConfirm, setShowConfirm] = React.useState({show:false}); 
   
   const handleSelected = async ( act, el, i)=>{
        if(act==="SELECT"){
            setSelectedRep({el, i, act});
            setSavedReportView({reportRaw:el, report:JSON.parse(el.text1), show:true})
            setDisplayReport({...displayReport, show:true});
            setReportCont({...reportCont, show:false});
            //console.log(JSON.parse(el))
        }else if(act==="DELETE"){
            setSelectedRep({el, i, act});
            setShowConfirm({show:true});
            setSavedReportView({reportRaw:el, report:JSON.parse(el.text1), show:false})
        }else if(act==="CANCEL"){
            setShowConfirm({show:false})
            setSavedReportView({report:el, show:false})
        }else if(act==="CONTINUE"){
            //console.log(savedReportView)
            if(savedReportView.reportRaw && user.companyId){
                const {url, body }= deleteQueryRecon(savedReportView.reportRaw, user);
                await patchRequest(url, body).then((res)=> {
                    console.log(res)
                    if(res?.ok){
                        mutate();
                        notify("success", "'"+savedReportView.reportRaw.name +"' Report deleted successfully!");
                        setSavedReportView({show:false});
                        setReportCont({...reportCont, show:false});
                    }else{notify("error", res?.error);}
                })
            }else{
                notify("error", "No report selected!");
            }
        }
   }

   const closeSavedReports =()=>{
     setReportCont({...reportCont, show:false});
     setSavedReportView({show:false});
   }
 
   

    return (
    <div className={`absolute w-full z-50 justify-center top-[120px] flex items-center ${reportCont.show? '' : 'hidden'}`}>
        <div className='bg-white h-fit  w-full max-w-[450px] relative shadow-lg'>
            <p className='bg-blue-500 p-2 text-center text-white'>Saved Reconciliation Reports</p>
            <MdClose className='absolute right-4 top-2 text-white hover:text-red-600 active:text-red-100 cursor-pointer' size={22}
                onClick={closeSavedReports}/>
            <div className='p-2 text-sm'>
                
                <div className='text-[13px] flex flex-col  border border-gray-200 m-2 p-2 h-[30vh] overflow-auto'>
                    {
                        data?.data?.map((dt, i)=>{
                            let by = dt?.updatedBy?.split("@")[1];
                            by = by.split(".");

                            return(
                                <div key={`${i}key`} className='flex text-gray-600 flex-row px-2 py-1 bg-blue-50 mb-2'
                                  > 
                                    <div className='flex flex-row justify-between flex-1'>
                                        <p  className="hover:text-blue-700 active:text-blue-300 cursor-pointer"
                                            onClick={()=>handleSelected("SELECT", dt, i)}>
                                            {i+1}. {dt.name}</p>
                                        
                                        <p className="text-teal-500">by {by[1]}</p>
                                    </div>
                                    <MdDelete className='text-red-500 text-[18px] ml-2 cursor-pointer hover:text-red-600 active:text-red-400'
                                     onClick={()=>handleSelected("DELETE", dt, i)}/>
                                </div>
                            )
                        })
                    }
                    <p className={`text-red-600 text-center ${data?.data?.length? 'hidden' : ''}`}>You have no saved reports!</p>
                </div>
               
            </div>
            <ConfirmAlert showBlind={showConfirm.show}
                title={"Delete '"+selectedRep.el?.name +"' Report"}
                msg="Do you really want to continue?"
                handleCancel={()=>handleSelected("CANCEL")}
                handleContinue={()=>handleSelected("CONTINUE")}
                confirmBtnName="Delete Report"
           />
        </div>
    </div>
  )
}

export default SavedReports