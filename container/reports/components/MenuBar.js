import { ExcelIcon } from '@/components/icons/iconsSvg';
import React from 'react'
import { BiArrowBack, BiArrowToRight, BiCaretUp, BiDetail, BiRightArrow } from 'react-icons/bi';
import { MdClose, MdDateRange, MdOutlineFeaturedPlayList, MdRefresh } from 'react-icons/md';
import { handleExport2Pdf } from '../utils/others/handleExport2Pdf';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { getStartAndEndDate } from '@/lib/dummyData/getStartAndEndDate';
import { isValidDate } from '@/lib/date/isValidDate';
import { datesDiffGreaterThan365, monthsDiffMoreThan12 } from '@/lib/date/datesDiffGreaterThan365';


const MenuBarBar = ({handleReportNav, handleExportToExcel, handleDetailReport, reportName, reportRows, reportRowKeys, 
    reportHeader, showBar, pdfData, pdfHeader, user, toastNotify, dateForm, setDateForm, ledgerCode,  monthlyQuery, 
    handleMonthlySummaryToggle, headerRowsColsArr, companyLogoFile, viewTransId, handleRefresh}) => {
    const [showDate, setShowDate] = React.useState(false);
    const [customDate, setCustomDate] = React.useState({startDate:{min:'', max:''}, endDate:{min:'', max:''}});
    const [dateFormPrelim, setDateFormPrelim] = React.useState("");
 
 const showDetailReport = reportName?.includes('fs-balance-sheet') || reportName?.includes('fs-income-statement');
 const showMonthlyReport = ledgerCode;
 const hideBtns = !reportName? true : false;

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
    setDateFormPrelim({...dateFormPrelim, [name]:value})
    //setDateForm({...dateForm, [name]:value})
}
const handleCustomDate =()=>{
    if(dateFormPrelim?.startDate || dateFormPrelim?.endDate){
        const startDateTime = new Date(dateFormPrelim.startDate).getTime();
        const endDateTime = new Date(dateFormPrelim.endDate).getTime();
        const startDateValid = isValidDate(dateFormPrelim.startDate);
        const endDateValid = isValidDate(dateFormPrelim.endDate);
        const monthsOver12 =  monthsDiffMoreThan12(dateFormPrelim.startDate, dateFormPrelim.endDate);
        //console.log(dateFormPrelim.startDate+"-"+startDateValid, dateFormPrelim.endDate+"-"+endDateValid, daysOver365 )
        if(startDateValid && endDateValid){
            if(startDateTime < endDateTime){
                if(monthsOver12){
                    toastNotify('error', 'Maximum custom dates should not be more than year')
                }else{
                    setDateForm({startDate:dateFormPrelim.startDate, endDate:dateFormPrelim.endDate, period:'CUSTOM'});
                    setShowDate(false);
                }
            }else{toastNotify('error', 'End date cannot be earlier than the start date.')}
        }else{toastNotify('error', startDateValid? 'Invalid date entered in End date' : 'Invalid date entered in Start date')}

    }else{toastNotify('error', 'Please, set the date range')}
}
  let hideDateComponent = false;
    const reportDateExcl = ["account-list-customers", "account-list-vendors", "account-list-products", "personal-ledgers-customers-balances", "personal-ledgers-vendors-balances", 
        "personal-ledgers-products-balances", "transaction-view"];
    if(reportDateExcl.includes(reportName) || (reportName == "products-valuation" && !viewTransId)){
       hideDateComponent = true;
     }

  return (
    <div className={`z-20 px-3 flex-row gap-3 shadow-md border-b-2 border-t-2 w-full items-center bg-sky-50 h-9 ${showBar? 'flex' : 'hidden'}`}>
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
        <div className={`flex-row gap-3 items-center ${hideBtns? 'hidden' :'flex'}`}>
            <div className='hover:tooltip-open tooltip tooltip-top' data-tip={'Export to Excel'}>
                <ExcelIcon className={'fill-green-700  h-5 w-5 cursor-pointer hover:fill-green-500 active:fill-green-800'}
                onClick={handleExportToExcel}/>
            </div>
            <div className='hover:tooltip-open tooltip tooltip-top' data-tip={'Export to Pdf'}>
                <BsFileEarmarkPdf className='text-[22px] text-red-500 cursor-pointer hover:text-red-400 active:text-red-700'
                onClick={handlePdfExport}
                />
            </div>
            <DateComp handleSelDate={handleSelDate}
                hideComponent={hideDateComponent}
                showDate={showDate}
                setShowDate={setShowDate}
                dateForm={dateFormPrelim}
                customDate={customDate}
                handleOnChange={handleOnChangeDate}
                handleCustomDate={handleCustomDate}
            />
            <div className={`flex flex-row items-center justify-center gap-2 ${showDetailReport? '' :'hidden'}`}>
                <div className={`hover:tooltip-open tooltip tooltip-top ${reportName?.includes('details')? 'hidden' :''}`} data-tip={'Detail report'}>
                    <BiDetail className='text-[24px] text-blue-700 cursor-pointer hover:text-blue-400 active:text-blue-700'
                    onClick={handleDetailReport}/>
                </div>
                <div className={`hover:tooltip-open tooltip tooltip-top ${reportName?.includes('details')? '' :'hidden'}`} data-tip={'Condensed report'}>
                    <MdOutlineFeaturedPlayList className='text-[24px] text-blue-700 cursor-pointer hover:text-blue-400 active:text-blue-700'
                    onClick={handleDetailReport}/>
                </div>
            </div>
            <div className={`flex flex-row items-center justify-center gap-2 ${showMonthlyReport? '' :'hidden'}`}>
                <div className={`hover:tooltip-open tooltip tooltip-top ${monthlyQuery? 'hidden' :''}`} data-tip={'Full month'}>
                    <BiDetail className='text-[24px] text-blue-700 cursor-pointer hover:text-blue-400 active:text-blue-700'
                    onClick={handleMonthlySummaryToggle}/>
                </div>
                <div className={`hover:tooltip-open tooltip tooltip-top ${monthlyQuery? '' :'hidden'}`} data-tip={'Monthly summary'}>
                    <MdOutlineFeaturedPlayList className='text-[24px] text-blue-700 cursor-pointer hover:text-blue-400 active:text-blue-700'
                    onClick={handleMonthlySummaryToggle}/>
                </div>
            </div>
        </div>
        <div className=' flex flex-1 justify-end'>
            <div className={`hover:tooltip-open tooltip tooltip-left flex items-center justify-between`} data-tip={'Refresh data'}>
                    <MdRefresh className='text-[24px] text-blue-700 cursor-pointer hover:text-blue-400 active:text-blue-700'
                    onClick={handleRefresh}/>
            </div>
        </div>
    </div>
  )
}

export default MenuBarBar;




const DateComp =({handleSelDate, showDate, dateForm, hideComponent, customDate, handleOnChange, setShowDate, handleCustomDate})=>{
    return(
        <div className={`hover:tooltip-open tooltip tooltip-top ${hideComponent? 'hidden':''}`} data-tip={'Set date'}
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

