'use client'
import { BiSearch } from 'react-icons/bi';
import ReportTable from './ReportTable';
import React, {useState, useEffect} from 'react';
import { MdCancel, MdClear } from 'react-icons/md';





const DynamicPageDisplay = ({ rowHeaders, rowKeysShow, rows,currentReport, clickables, handleClickCell,  reportDate, viewTransId, subTitle, transactionsDetails,
    clickedHeader, setClickedHeader }) => {
  const [searchValue, setSearchValue] = React.useState(""); 
  let rowsForDisplay = rows;
  
  let currentReportTitle = currentReport?.title;
  let reportDateDisplay = reportDate;


  const onChangeHandler =(e)=>{
    setSearchValue(e.target.value)
  }
  const handleCancel =()=>{
    setSearchValue("")
  }
  if(searchValue){
    rowsForDisplay = [...rows].filter((dt)=>{
      const transSearch = `${dt.description} ${dt.account} ${dt.accountSub} ${dt.reference} ${dt.postedBy} ${dt.transId} ${dt.date} ${dt.debit} ${dt.credit}`
      return transSearch.toLowerCase().includes(searchValue.toLocaleLowerCase())
    })
  }

  return (
    <div className='flex w-full flex-col justify-center items-center p-3 pt-0 mx-4 text-gray-600'>
      <div className={`my-3 text-[13px]`}>
        <p className='text-center font-medium'>{currentReportTitle}</p>
         <p className='text-center'>{reportDateDisplay}</p>
         <p className='text-center'>{subTitle}</p>
      </div>

      <div className={`${viewTransId? 'hidden' :'flex'} grow self-start gap-2 smc:w-[400px] items-center bg-white border px-3 border-blue-400 rounded-md focus:border-blue-600`}>
        <input type="text" className="bg-white input-sm outline-none py-2 rounded-md w-full" placeholder="Search" 
          onChange={onChangeHandler} value={searchValue}/>
        <BiSearch size={22} className={` ${searchValue? 'hidden' : ''}`}/>
        <MdClear size={22} className={`cursor-pointer active:text-red-200 text-red-600 ${searchValue? '' : 'hidden'}`}
          onClick={handleCancel}/>
      </div>
       <div className={`w-[98%] overflow-x-auto mr-10 mt-1`}>
          <ReportTable
                classNameTable={`overflow-x-auto overflow-y-auto h-[70vh] resize-y`} //${viewTransId? 'max-h-[75vh]' : 'max-h-[60vh]'}
                header={[{className:'bg-blue-50 py-5', title:''}, ...rowHeaders]}
                rowKeys={rowKeysShow}
                rows={rowsForDisplay}
                classNameHeaderTR="bg-blue-50" 
                classNameRowsTR="border border-gray-200 hover:bg-blue-50"
                clickableHeader={true}
                onClickHeader={(e)=>setClickedHeader({...clickedHeader, ...e})}
                clickableRowCellKeys ={clickables?.length? clickables : clickables === "ALL"? "ALL" : []} //['name']
                onClickRowCell={handleClickCell}
                pinRow
                clickedHeader={clickedHeader}
                setClickedHeader={setClickedHeader}
              />
       </div>
    </div>
  )
}

export default DynamicPageDisplay