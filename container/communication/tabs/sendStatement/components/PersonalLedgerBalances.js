'use client'
import React from 'react';
import { formatToCurrency } from '@/lib/currency';
import { BsArrowDown } from 'react-icons/bs';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
//import ExportToExcel from '@/pagesContainer/company/excel/ExportToExcel';


const PersonalLedgerBalances = ({personalLedgerArr, handleSelectedLedger, hideExport, title}) => {
    const [personalLedgerSelected, setPersonalLedgerSelected] = React.useState([]);
    const [selectedHeader, setSelectedHeader] = React.useState('ACCOUNTCODE');

    function handerSelectedHeader(sel){
        setSelectedHeader(sel);
        const key ={
            ACCOUNTCODE:'accountCodeSub',
            ACCOUNTNAME:'name',
            ACCOUNTNAMECONTROL:'debitAccount',
            BALANCE:'closingBal',
        }
        const personalLedgerSelectedCopy = [...personalLedgerSelected];
        sortArrayByKey(personalLedgerSelectedCopy, key[sel]);
        setPersonalLedgerSelected(personalLedgerSelectedCopy)
    } 
    //console.log(personalLedgerArr);

    React.useEffect(()=>{
      setPersonalLedgerSelected(personalLedgerArr)
    },[personalLedgerArr]);

    const rows = `flex items-center  flex-row  gap-1`;
    const headerRow = `${rows} text-white bg-sky-600 font-bold`;
    const col1 = `w-[50px] text-center`;
    const header = `flex flex-row items-center py-2 cursor-pointer active:text-blue-700`;
    const headerCol1 = `${col1} py-2 `;

    const col2 = `w-[110px]`;
    const headerCol2 = `${col2}  ${header}`;
    
    const col3 = `w-[210px] px-2`;
    const headerCol3 = `${col3}  ${header}`;

    const col3a = `w-[230px] px-2`;
    const headerCol3a = `${col3a}  ${header}`;
    
    const col4 = `w-[130px] px-2`;
    const headerCol4 =`${col4}  ${header}`;

    return (
        <div className='bg-sky-100  m-3 rounded-md p-2 text-[12px] md:text-base font-bold text-blue-900'>
                <p className='text-purple-800 py-1 px-2 w-fit'>{title? title : "PERSONAL LEDGER BALANCES"}</p>
                <p className='text-gray-600  px-2 w-fit text-[12px] font-normal'>Click on the header to sort</p>
                <div className={`flex items-center justify-between my-3 ${hideExport? 'hidden' :''}`}>
               </div>
                <div className='min-w-400 overflow-x-auto text-sm'>
                    <div
                        className={`${headerRow} w-[500px] smc:w-[700px] mdc:w-[1000px]`}>
                        <p className={`${headerCol1}`}>SN </p>
                        <p className={`${headerCol2}`}
                        onClick={()=>handerSelectedHeader('ACCOUNTCODE')}>Account code {selectedHeader==='ACCOUNTCODE'&& <BsArrowDown/>}</p>
                        <p className={`${headerCol3}`}
                            onClick={()=>handerSelectedHeader('ACCOUNTNAME')}>
                                Account name {selectedHeader==='ACCOUNTNAME'&& <BsArrowDown/>}
                        </p>
                        <p className={`${headerCol3a}`}
                            onClick={()=>handerSelectedHeader('ACCOUNTNAMECONTROL')}>
                                Control account {selectedHeader==='ACCOUNTNAMECONTROL'&& <BsArrowDown/>}
                        </p>
                        <p className={`${headerCol4}`}
                        onClick={()=>handerSelectedHeader('BALANCE')}>
                            Balance {selectedHeader==='BALANCE'&& <BsArrowDown/>}
                        </p>
                    </div>
                    <div className='max-h-[40vh] w-[500px] smc:w-[700px] mdc:w-[1000px]'
                    >
                        {personalLedgerSelected?.map((vendorAcct, i)=>{
                            //const ctrlAcctCode = vendorAcct?.transactions[0]?.accountCode;
                            return(
                                <> 
                                    <div key={`${i}main`}
                                        className={`${rows} cursor-pointer py-2 ${i%2? 'bg-white' : "bg-[aliceblue]"}`}
                                        onClick={()=>handleSelectedLedger(vendorAcct)}>
                                        <p className={`${col1}`}>{i+1}.</p>
                                        <p className={`${col2}`}>{vendorAcct.accountCodeSub}</p>
                                        <p className={`${col3}`}>{vendorAcct.name}</p>
                                        <p className={`${col3a}`}>
                                            {/*ctrlAcctCode}-{allAccountCodes[ctrlAcctCode]?.accountName*/}
                                        </p>
                                        <p className={`${col4}`}>{formatToCurrency(vendorAcct.closingBal,2)}</p>
                                    </div>
                                    
                                </>
                            )
                        })}
                    </div>
                </div>
        </div>
  )
}

export default PersonalLedgerBalances;



