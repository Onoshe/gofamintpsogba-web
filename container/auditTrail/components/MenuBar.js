import { ExcelIcon } from '@/components/icons/iconsSvg';
import React from 'react'
import { BiArrowBack,  BiDetail, } from 'react-icons/bi';
import { MdClose, MdDateRange, MdLocalActivity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { handleExport2Pdf } from '@/container/reports/utils/others/handleExport2Pdf';
import { BsFileEarmarkPdf, BsGear } from 'react-icons/bs';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { getStartAndEndDate } from '@/lib/dummyData/getStartAndEndDate';
import { AiOutlineHistory } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';


const MenuBarBar = ({handleReportNav, handleExportToExcel, viewTransId, handleDetailReport, reportName, reportRows, reportRowKeys, 
    reportHeader, showBar, pdfData, pdfHeader, user, toastNotify, dateForm, setDateForm, handleActivityToggle, 
    handleMonthlySummaryToggle, headerRowsColsArr, companyLogoFile}) => {
    const [showDate, setShowDate] = React.useState(false);
    const [customDate, setCustomDate] = React.useState({startDate:{min:'', max:''}, endDate:{min:'', max:''}});
   
 

 const showBtns = viewTransId && viewTransId !== "activities-log"? true : false;

const handleSelDate = (date)=>{
    setShowDate(false)
    const res = getStartAndEndDate(date?.name);
    setDateForm(res);
}
const handlePdfExport =()=>{
    handleExport2Pdf({reportRows, reportHeader, pdfHeader, pdfData, headerRowsColsArr, companyLogoFile});
    postActivity(user, activities.DOWNLOAD, pdfHeader[1][0]+" report exported to pdf")
}

const handleOnChangeDate =(e)=>{
    const {name, value} = e.target;
    setDateForm({...dateForm, [name]:value})
}
const handleCustomDate =()=>{
    if(dateForm.startDate || dateForm.endDate){
        const startDateTime = new Date(dateForm.startDate).getTime();
        const endDateTime = new Date(dateForm.endDate).getTime();
        if(startDateTime < endDateTime){
            setDateForm({startDate:dateForm.startDate, endDate:dateForm.endDate, period:'CUSTOM'});
            setShowDate(false);
        }else{toastNotify('error', 'End date cannot be earlier than the start date.')}
    }else{toastNotify('error', 'Please, set the date range')}
}
  let hideComponent = false;
    const reportDateExcl = ["account-list-customers", "account-list-vendors", "account-list-products", "personal-ledgers-customers-balances", "personal-ledgers-vendors-balances", "personal-ledgers-products-balances"];
    if(reportDateExcl.includes(reportName)){
       hideComponent = true;
     }

  return (
    <div className={`z-20 px-3 flex-row gap-3 shadow-md border-b-2 border-t-2 w-full items-center justify-between bg-sky-50 h-9 ${showBar? 'flex' : 'hidden'}`}>
            
         <div className='flex flex-row gap-3 2 items-center'>   
            <div className='hover:tooltip-open tooltip tooltip-right' data-tip={'Back'}>
                <BiArrowBack size={24} className='text-[navy] hover:bg-blue-100 shadow-md rounded-lg cursor-pointer hover:text-blue-500 active:text-blue-300' 
                onClick={()=>handleReportNav('PREV')}
                />
            </div>
            <div className='hover:tooltip-open tooltip tooltip-right' data-tip={'Next'}>
                <BiArrowBack size={24} className='text-[navy] hover:bg-blue-100 shadow-md rounded-lg tooltip-open tooltip-top tooltip cursor-pointer hover:text-blue-500 active:text-blue-300 rotate-180' 
                onClick={()=>handleReportNav('NEXT')}
                />
            </div>
            {!viewTransId || viewTransId === "activities-log"? 
                <DateComp handleSelDate={handleSelDate}
                    hideComponent={hideComponent}
                showDate={showDate}
                setShowDate={setShowDate}
                dateForm={dateForm}
                customDate={customDate}
                handleOnChange={handleOnChangeDate}
                handleCustomDate={handleCustomDate}
                />:<></>}
            <div className={`flex-row gap-3 items-center ${showBtns? 'flex' : 'hidden'}`}>
                <div className='hover:tooltip-open tooltip tooltip-bottom' data-tip={'Export to Excel'}>
                    <ExcelIcon className={'fill-green-700  h-5 w-5 cursor-pointer hover:fill-green-500 active:fill-green-800'}
                    onClick={handleExportToExcel}/>
                </div>
                <div className='hover:tooltip-open tooltip tooltip-bottom' data-tip={'Export to Pdf'}>
                    <BsFileEarmarkPdf className='text-[22px] text-red-500 cursor-pointer hover:text-red-400 active:text-red-700'
                    onClick={handlePdfExport}
                    />
                </div>
                
             </div>
            </div>
            <div>
                <div className='hover:tooltip-open mx-2 tooltip tooltip-left' data-tip={'Posted Transactions'}>
                    <GrTransaction className='text-[22px] text-red-900 cursor-pointer hover:text-red-600 active:text-red-700'
                        onClick={()=>handleActivityToggle("TRAN")}
                    />
                </div>
                <div className='hover:tooltip-open tooltip tooltip-bottom mx-2' data-tip={'Activities'}>
                    <AiOutlineHistory className='text-[22px] text-red-900 cursor-pointer hover:text-red-600 active:text-red-700'
                        onClick={()=>handleActivityToggle("ACT")}
                    />
                </div>
            </div>
            
    </div>
  )
}

export default MenuBarBar;




const DateComp =({handleSelDate, showDate, dateForm, hideComponent, customDate, handleOnChange, setShowDate, handleCustomDate})=>{
    return(
        <div className={`hover:tooltip-open  ${hideComponent? 'hidden':''}`}
          onMouseEnter={()=>setShowDate(true)}
          onMouseLeave={()=>setShowDate(false)}
          >
            <MdDateRange className='text-[24px] text-blue-700 cursor-pointer hover:text-blue-400 active:text-blue-700'
             />
            <>
                <div className={`z-50 fixed left-2 sm:left-auto sm:absolute pb-2 text-[12px] md:text-[12px] border border-blue-600 rounded-md bg-blue-50 shadow-lg ${showDate? '' :'hidden'}`}>
            
                    <p className="text-center bg-blue-500 font-bold text-white p-2 mb-2">Select Date</p>
                    <div className="flex flex-col">
                        {dropdownList?.map((dt, i)=>{
                            return(
                                <div key={`${i}key`}
                                    className={`text-gray-600 text-left py-1 px-5 hover:bg-blue-100 hover:text-blue-800 cursor-pointer active:text-blue-400`}
                                onClick={()=>handleSelDate(dt)}>
                                    {dt.title}
                                </div>
                            )
                        })}
                        <div className='flex flex-col bg-gray-200 pb-2 mx-1 rounded-md'>
                           <p className={`text-gray-600 text-left py-1 pl-5 font-[500]`}>Set date range</p>
                            <div className='flex flex-row items-center'>
                                <div className={`text-gray-600 text-left pl-5 cursor-pointer`}>
                                    <p>Start date</p>
                                    <input type='date' className='bg-blue-100 hover:bg-blue-200 py-1 border border-gray-400 rounded-[4px] cursor-pointer px-1 w-[100px]'
                                      name='startDate'
                                      value={dateForm.startDate}
                                      //min={customDate.startDate.min}
                                      //max={customDate.startDate.max}
                                      onChange={handleOnChange}/>
                                </div>
                                <div className={`text-gray-600 text-left pl-1 cursor-pointer`}>
                                    <p>End date</p>
                                    <input type='date' className='bg-blue-100 hover:bg-blue-200 py-1 border border-gray-400 rounded-[4px] cursor-pointer px-1 w-[100px]'
                                      name='endDate'
                                      value={dateForm.endDate}
                                      //min={customDate.endDate.min}
                                      //max={customDate.endDate.max}
                                      onChange={handleOnChange}/>
                                </div>
                                <p className='bg-teal-600 -mb-1 hover:bg-teal-700 active:bg-teal-600 text-white font-bold m-2 py-1 px-2 rounded-md cursor-pointer'
                                 onClick={handleCustomDate}>Go</p>
                            </div>
                        </div>
                </div>
                </div>
            </>
    </div>
    )
}

var dropdownList = [
    {name:'TODAY', title:'Today'},
    {name:'THIS-WEEK', title:'This Week'},
    {name:'LAST-WEEK', title:'Last Week'},
    {name:'THIS-MONTH', title:'This Month'},
    {name:'LAST-MONTH', title:'Last Month'},
    {name:'THIS-QUARTER', title:'This Quarter'},
    {name:'LAST-QUARTER', title:'Last Quarter'},
    {name:'THIS-YEAR', title:'This Year'},
    {name:'LAST-YEAR', title:'Last Year'},
    {name:'FIRST-HALF-OF-THE-YEAR', title:'First half of the year'}

];

