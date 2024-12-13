import { formatToCurrency } from "@/lib/currency";
import { ExcelIcon } from '@/components/icons/iconsSvg';
import { BsFileEarmarkPdf, BsSave2 } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

const ReconReportTable = ({
    header=[], rows=[], rowKeys=[], pinRow, pinCol, reportDetails,
    clickableHeader, onClickHeader, clickableRow, onClickRow,   classNameTable,  classNameHeaderTR, classNameRowsTR,
    displayReport, setDisplayReport, handleReconReport, savedReportView, setSavedReportView}) => {

    const handleOnChange =(e)=>{
            setDisplayReport({...displayReport, name:e.target.value})
    }
    const handleCloseReport =()=>{
        setSavedReportView({show:false})
        setDisplayReport({...displayReport, show:false})
    }
  return (
    <div className={`${displayReport.show? '' :'hidden'} w-full flex-col justify-center items-center pt-0 text-gray-600
        `}>
    <div className="fixed lg:w-[calc(100vw-225px)] w-full bg-gray-200 z-10 mr-10 py-1 px-3 text-blue-800 text-sm flex flex-row flex-wrap items-center justify-between">
        <div className="absolute top-1 flex w-full justify-end pr-10">
            <div className='hover:tooltip-open tooltip tooltip-left -mr-[80px]' data-tip={'Close report'}>
                    <GrClose className='text-[18px]  cursor-pointer text-red-600  hover:text-red-700 active:text-red-500'
                         onClick={handleCloseReport}/>
            </div>

            <div className="flex gap-4 mt-5">
                <div className='hover:tooltip-open tooltip tooltip-left' data-tip={'Export to Excel'}>
                    <ExcelIcon className={'fill-green-700  h-5 w-5 cursor-pointer hover:fill-green-500 active:fill-green-800'}
                    onClick={()=>handleReconReport("EXCEL")}/>
                </div>
                <div className='hover:tooltip-open tooltip tooltip-left' data-tip={'Export to Pdf'}>
                    <BsFileEarmarkPdf className='text-[22px] text-red-500 cursor-pointer hover:text-red-400 active:text-red-700'
                    onClick={()=>handleReconReport("PDF")}
                    />
                </div>
            </div>
        </div>
        <div className={`flex flex-col w-full h-12 ${!savedReportView?.show? 'max-w-[350px]' : '' }`}>
            {!savedReportView?.show?
                <div className="flex flex-row items-center gap-2 mr-[80px] smc:mr-0">
                    <input className='min-w-[100px] z-10 flex-1 bg-white py-[4px] px-2 border border-blue-400'
                                    name="reportName"  placeholder='Report name' value={displayReport.name}  onChange={handleOnChange} required/>

                    <div className='hover:tooltip-open tooltip tooltip-right' data-tip={'Save report'}>
                        <BsSave2 className='text-[22px] text-red-500 cursor-pointer hover:text-red-400 active:text-red-700'
                        onClick={()=>handleReconReport("SAVE")}
                        />
                    </div>
                </div>
            :<div>
                <p className=" text-red-900 font-[600] -mt-[6px] underline">Report Name:</p>
                <p className=" text-blue-800 font-[600]">{savedReportView.reportRaw.name}</p>
            </div>
            }
        </div>
            <div className="gap-4 mt-7 bg-red-500 hidden">
                <div className='hover:tooltip-open tooltip tooltip-left' data-tip={'Export to Excel'}>
                    <ExcelIcon className={'fill-green-700  h-5 w-5 cursor-pointer hover:fill-green-500 active:fill-green-800'}
                    onClick={()=>handleReconReport("EXCEL")}/>
                </div>
                <div className='hover:tooltip-open tooltip tooltip-left' data-tip={'Export to Pdf'}>
                    <BsFileEarmarkPdf className='text-[22px] text-red-500 cursor-pointer hover:text-red-400 active:text-red-700'
                    onClick={()=>handleReconReport("PDF")}
                    />
                </div>
            </div>
    </div>
    <div className="px-4 py-2 mt-12">
        <div className={`mb-3 font-[600]`}>
            <p className='text-center'>{reportDetails?.companyName}</p>
            <p className='text-center'>{reportDetails?.title}</p>
            <p className='text-center'>{reportDetails?.asAt}</p>
            <p className='text-center'>{reportDetails?.accountTitle}</p>
        </div>
        <div className='w-[98%] overflow-x-auto mr-10'>
            <div className={classNameTable}
                    data-theme="pastel" >
                    <table className={`table table-sm table-zebra ${pinRow? 'table-pin-rows' :''} ${pinCol? 'table-pin-cols' :''}`}>
                        <thead className="">
                            <tr className={`text-[14px] ${classNameHeaderTR}`}>
                                <th className={'py-6'}>{''}</th> 
                                {rowKeys?.map((key, i)=>{
                                    const dt = header?.find((e)=> e.name === key);
                                    return(
                                        <th key={`${i}header`} 
                                            className={`${dt?.className} whitespace-nowrap ${clickableHeader && 'cursor-default'}`} 
                                            onClick={()=>{if(clickableHeader){onClickHeader(dt)}}}>
                                            {dt?.title}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead> 
                        <tbody>
                            {rows?.map((row, i)=>{
                                //console.log(row)
                                return(
                                    <tr key={`${i}td`} className={`${classNameRowsTR} ${row?.rowStyle}`}>
                                        <td className={``}>{i+1}</td>
                                        {
                                        rowKeys?.map((key, id)=>{
                                                const displayData = getDisplayData(row, key);
                                                return(
                                                    <td key={`${id}key`}
                                                        className={`${row.classNameTD} ${clickableRow && ''}`}  
                                                        onClick={()=>{if(clickableRow){onClickRow(row)}}}>
                                                        <span className={`${row[key+"ClassName"]}`} 
                                                            >
                                                            {displayData}
                                                        </span>
                                                    </td>
                                                )
                                        }) 
                                        }
                                    </tr>
                                )
                            })}
                        </tbody> 
                    </table>
            </div>
        </div>
    </div>
    </div>
        
  )
}

function getDisplayData(row, key){
   let data = "";
   const isAmount = parseFloat(row[key]);
   if(typeof row[key] == 'number'){
    data = formatToCurrency(row[key]);
   }else if(isAmount && ['amount', 'balance', 'debit', 'credit'].includes(key)){
    data = formatToCurrency(parseFloat(row[key]));
   }else{  data = row[key]}
  return data  
}

export default ReconReportTable;