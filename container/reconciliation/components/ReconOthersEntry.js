import { formatToCurrency } from '@/lib/currency';
import React from 'react'
import { MdCancel, MdClose } from 'react-icons/md';


const ReconOthersEntry = ({formOthers, setFormOthers, reconOthers,setReconOthers,reconDataForDislay, showOKBtn=false, othersAmount=0}) => {
    const diffRecon = Math.abs(reconOthers.diff)  < 1;
    
    const handleOnEnterOthers =(e)=>{
        const {name, value} = e.target;
        setFormOthers({...formOthers, new:{...formOthers.new, [name]:value}});
      }

    const handleOnEnter =(e)=>{
        e.preventDefault();
        if(formOthers.new.description && formOthers.new.amount != ""){
            setFormOthers({new:{description:'', amount:''}, forms:[...formOthers.forms, formOthers.new]});
        }
      }
   const handleDeleteOther =(el, i)=>{
     const forms = formOthers.forms.filter((_, id)=> id !== i);
     setFormOthers({...formOthers, forms})
   }

   const handleHide =()=>{
    setReconOthers({...reconOthers, show:false});
   }
 
   const handleOnOkay =()=>{
        handleHide();
   }

    return (
    <div className='fixed w-full z-50 flex justify-center p-5 pt-[100px] top-0 bottom-0 right-0 bg-slate-400/50'>
        <div className='bg-white h-fit  w-full max-w-[450px] relative'>
            <p className='bg-blue-500 p-2 text-center text-white'>Others Reconciliation</p>
            <MdClose className='absolute right-4 top-2 text-white hover:text-red-600 active:text-red-100 cursor-pointer' size={22}
                onClick={handleHide}/>
            <div className='p-2 text-sm'>
                <p className={`text-gray-600 px-2`}>Others: {formatToCurrency(parseFloat(reconDataForDislay.errorAdj))}</p>
                <p className='text-gray-600 px-2'>Add: {formatToCurrency(parseFloat(reconOthers.add))}</p>
                <p className='text-gray-600 px-2'>Less: {formatToCurrency(parseFloat(reconOthers.less))}</p>
                <p className={` ${diffRecon?  'text-teal-800' :'text-red-600'} font-bold px-2`}>
                    Diff: {formatToCurrency(parseFloat(reconOthers.diff))}
                </p>
                <div className='text-[13px] flex flex-col  border border-gray-200 m-2 p-2 h-[30vh] overflow-auto'>
                    {
                        formOthers?.forms?.map((dt, i)=>{
                            return(
                                <div key={`${i}key`} className='flex text-gray-600 flex-row px-3 py-1 bg-blue-50 mb-2'> 
                                    <div className='flex flex-row justify-between flex-1'>
                                        <p>{dt.description}</p>
                                        <p>{formatToCurrency(parseFloat(dt.amount))}</p>
                                    </div>
                                    <p className='text-red-500 ml-2 cursor-pointer hover:text-red-600 active:text-red-400'
                                     onClick={()=>handleDeleteOther(dt, i)}>
                                    X</p>
                                </div>
                            )
                        })
                    }
                </div>
                <form className='flex flex-row flex-wrap gap-2 text-[13px] text-gray-700 bg-gray-100 border border-gray-200 p-2' onSubmit={handleOnEnter}>
                    <div className='flex flex-col flex-1'>
                        <p>Description</p>
                        <textarea className=' bg-white py-[3px] px-2 border border-blue-400 min-w-[100px]'
                           name="description" placeholder='Enter description' onChange={handleOnEnterOthers} value= {formOthers.new.description}
                            required>
                            {formOthers.new.description}
                        </textarea>
                    </div>
                    <div className='flex flex-col justify-between gap-2'>
                        <div className='flex flex-col justify-end flex-1'>
                            <p>Amount</p>
                            <input className='max-w-[150px] bg-white py-[5px] px-2 border border-blue-400'
                            name="amount" type='number' placeholder='Debit/ (Credit) amount' value={formOthers.new.amount}  onChange={handleOnEnterOthers} required/>
                        </div>
                        <div className='flex flex-row justify-end flex-1 gap-2'>
                            <div className='flex flex-col flex-1'>
                                <button className='bg-blue-500 active:bg-blue-400 hover:bg-blue-600 text-white py-[6px] rounded-sm px-3 h-fit'
                                >Enter</button>
                            </div>
                            <div className={`${diffRecon? '' : 'hidden'}`}>
                                <p className='bg-teal-500 cursor-pointer active:bg-teal-400 hover:bg-teal-600 text-white py-[6px] rounded-sm px-3 h-fit'
                                 onClick={handleOnOkay}>Okay</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default ReconOthersEntry