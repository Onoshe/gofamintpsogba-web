'use client'
import React from 'react';
import { formatToCurrency } from '@/lib/currency';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';


const LoanTable = ({}) => {
    const personalLedgerArr = []; const handleSelectedLedger =[]; const allAccountCodes= {};
    const [vendorsLedger, setVendorsLedger] = React.useState([]);
    const [selectedHeader, setSelectedHeader] = React.useState('ACCOUNTCODE');

    //console.log(vendorsLedger)
    function handerSelectedHeader(sel){
        setSelectedHeader(sel);
        const key ={
            ACCOUNTCODE:'accountCode',
            ACCOUNTNAME:'accountName',
            ACCOUNTNAMECONTROL:'debitAccount',
            BALANCE:'balance',
        }
        const vendorsLedgerCopy = [...vendorsLedger];
        sortArrayByKey(vendorsLedgerCopy, key[sel]);
        setVendorsLedger(vendorsLedgerCopy)
    } 

    React.useEffect(()=>{
      setVendorsLedger(personalLedgerArr)
    },[personalLedgerArr]);

    const rows = `flex items-center  flex-row  gap-1`;
    const headerRow = `${rows} text-white bg-sky-600`;
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
                <p className='text-purple-800 py-1 px-2 w-fit'>PERSONAL LEDGER BALANCES</p>
                <p className='text-gray-600  px-2 w-fit text-[12px] font-normal'>Click on the header to sort</p>
            
                <div className='min-w-400 overflow-x-auto'>
                    
                    <div
                        className={`${headerRow}`}>
                        <p className={`${headerCol1}`}>SN </p>
                        <p className={`${headerCol2}`}>Account code</p>
                        <p className={`${headerCol3}`}>Account name</p>
                        <p className={`${headerCol3a}`}>Loan Amount</p>
                        <p className={`${headerCol3a}`}>Loan Balance</p>
                        <p className={`${headerCol4}`}>Loan details</p>
                        <p className={`${headerCol3a}`}>Loan Start Date</p>
                        <p className={`${headerCol3a}`}>Loan Due Date</p>
                        <p className={`${headerCol3a}`}>Days to Due Date</p>
                        <p className={`${headerCol4}`}>Last repayment</p>
                    </div>
                    <div className='max-h-[40vh]'
                    >
                        {vendorsLedger?.map((vendorAcct, i)=>{
                            const ctrlAcctCode = vendorAcct?.transactions[0]?.accountCode;
                            return(
                                <> 
                                    <div key={`${i}main`}
                                        className={`${rows} cursor-pointer py-2 ${i%2? 'bg-white' : "bg-[aliceblue]"}`}
                                        onClick={()=>handleSelectedLedger(vendorAcct)}>
                                        <p className={`${col1}`}>{i+1}.</p>
                                        <p className={`${col2}`}>{vendorAcct.accountCode}</p>
                                        <p className={`${col3}`}>{vendorAcct.accountName}</p>
                                        <p className={`${col3a}`}>
                                            {ctrlAcctCode}-{allAccountCodes[ctrlAcctCode]?.accountName}
                                        </p>
                                        <p className={`${col4}`}>{formatToCurrency(vendorAcct.balance,2)}</p>
                                    </div>
                                    
                                </>
                            )
                        })}
                    </div>
                </div>
        </div>
  )
}

export default LoanTable;



