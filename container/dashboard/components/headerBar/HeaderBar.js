import React from 'react'
import { IoMdArrowRoundForward } from 'react-icons/io';
import { MdClose, MdDateRange, MdOutlineReport, MdReport, MdSearch } from 'react-icons/md';
import { BiRefresh } from 'react-icons/bi';
import SearchBar from './SearchBar';
import Link from 'next/link';
import Spinner from '@/components/misc/Spinner';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';



const HeaderBar = ({chartOfAccounts,handleSelAccount, loadingReportPage, setLoadingReportPage, listOfAccounts, setListOfAccounts, companyId, 
    router,user, handleRefreshData, reportDate, onChangeReportDate, customers, vendors, products, expired}) => {

    const handleSelectedLedger =(ledger)=>{
        const ledgerCode = ledger.accountCode;
        //console.log(ledger)
        //http://localhost:3000/demo/reports/gl?l=113000
        const route = `/${companyId}/reports/gl?l=${ledgerCode}`;
        router.push(route);
    }
   
    const handleReportPage =()=>{
        setLoadingReportPage(true);
    }
    sortArrayByKey(chartOfAccounts, 'accountCode')
    //console.log(chartOfAccounts);

  return (
    <div className='relative bg-white -mt-[11px] smc:mt-0'>
        {expired && <div className='absolute top-0 w-full bottom-0 bg-red-50/60 z-20'></div>}
        <div className='justify-between px-4 hidden bg-white smc:flex'>
            <p className='text-blue-500 font-bold invisible'>Dashboard</p>
            <div className='flex-row gap-3 py-2 flex'>
                <Link href={`/${companyId}/reports`} onClick={handleReportPage} className='flex flex-row active:bg-blue-50 cursor-pointer hover:shadow-lg items-center border shadow-md border-gray-300 w-fit px-2 py-[3px] text-[12px] rounded-sm'
                 >
                    <Spinner 
                        showSpinner={loadingReportPage} 
                        showMsg={false}
                        msg="Loading report, please wait..."
                        contStyle={`flex flex-col`}
                        spinnerStyle={'mr-1 dark:text-[red] fill-[blue] h-3 w-3'}
                    />
                    <MdOutlineReport/><p>Reports</p><IoMdArrowRoundForward/>
                </Link>
                <div className='flex flex-row items-center active:bg-blue-50 cursor-pointer hover:shadow-lg border shadow-md border-gray-300 w-fit px-2 py-[3px] text-[12px] rounded-sm'
                  onClick={()=>setListOfAccounts(true)}>
                    <MdOutlineReport/><p>List of Accounts</p><IoMdArrowRoundForward/>
                </div>
            </div>
        </div>
        <div className='flex w-full items-center justify-between p-2 bg-blue-100 shadow-md mb-10'>
            <SearchBar chartOfAccounts={chartOfAccounts} user={user}
                customers={customers}
                vendors={vendors}
                products={products}
                />
            <div className='flex flex-row  text-blue-600  hover:tooltip-open tooltip tooltip-top' data-tip={'Report date'}>
                <p className="px-2">Reports as at </p>
                <input type='date' className='bg-blue-400  rounded-sm px-1 border border-white cursor-pointer text-white w-fit'
                    onChange={onChangeReportDate} value={reportDate}/>
                
            </div>
        </div>
        <div className={`${listOfAccounts? 'flex' : 'hidden'} bg-blue-400/60 w-full h-screen fixed pt-[20vh] top-0 bottom-0 flex-col items-center`}>
                <div className='relative bg-white w-fit border border-gray-500 shadow-lg rounded-md'>
                    <p className='py-2 px-3 text-center font-bold text-white bg-blue-400'>List of Accounts</p>
                    <MdClose size={22} className='absolute top-2 right-3 cursor-pointer active:text-red-400 text-white hover:text-red-600'
                     onClick={()=>setListOfAccounts(false)}/>
                    <div className='w-full min-w-[250px] text-[12px] smc:text-base max-w-[450px] overflow-y-auto max-h-[60vh] py-3'>
                        { chartOfAccounts?.map((dt, i)=>{
                            return(
                                <p key={`${i}key`} className='px-2 cursor-pointer py-1 active:bg-blue-50 hover:bg-blue-100'
                                  onClick={()=> handleSelectedLedger(dt)}>
                                    {`${dt.accountCode}: ${dt.accountName}`}
                                </p>
                            )
                        })

                        }
                    </div>
                </div>
        </div>
    </div>
  )
}

export default HeaderBar