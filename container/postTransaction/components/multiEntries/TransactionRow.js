import React from 'react';
import TransactionEntryRow from './TransactionEntryRow';
import { getSubAccounts } from '../utils/getSubAccounts';
import { getSubAccountsMultiEntry } from '../utils/getSubAccountsMultiEntry';
import DropdownComponent from '@/components/forms/DropdownComponent';



const TransactionRow = ({styleTitle, hideTitle, index, transSheet, handleOnChange, handleAddRemoveRow, controlAcctsCode,
    chartOfAccounts, chartOfAccountSelection, personalAcctsList, personalAccts, productsList, netAmount, selectedDueDate, setSelectedDueDate, controlAcctTest}) => {
    const classNameTitle = `text-blue-900 border-y border-blue-600 font-bold bg-blue-100 -mr-2 p-3 mb-2 ${hideTitle? 'hidden' :''} ${styleTitle}`;
    const classNameBLine = `border-y border-gray-300  -mr-2 mb-2 ${hideTitle? '' :'hidden'}`;
    const classNameCont = `${'flex-shrink-0'}`;
    const classNameContDate = `w-[150px] mr-2`;
    const classNameContDesc = `w-2/3 max-w-[330px]  mr-2`;
    const classNameContRef = `w-1/3 max-w-[185px] r-2`;

    const classNameContSel = `w-[180px] mr-2`;
    const classNameContSelSub = `w-[160px] mr-2`;
    const classNameContQuant = `w-[100px] mr-2`;
    const classNameContAmount = `w-[150px] mr-2`;
    const classNameContAdd = `w-[30px] mx-3`;
    const classNameContDrCr = `w-[100px] mr-2`;
    //console.log(chartOfAccountSelection, personalAcctsList);
    //console.log(transSheet);

    const chartOfAcctSelWithoutInvtControl = chartOfAccountSelection?.filter((dt)=> ![parseInt(dt?.typeCode) || 0, parseInt(dt?.code) || 0].includes(parseInt(controlAcctsCode.inventoryControl)) &&
    ![parseInt(dt?.typeCode) || 0, parseInt(dt?.code) || 0].includes(parseInt(controlAcctsCode.inventoryAdj)));

    //const isRecControl= false; const isPayControl = true;
  return (
    <div className='flex flex-col mb-3'>
            <div className='flex flex-row w-[700px]'>
                <div className={`${classNameContDate} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>Date</p>
                    <p className={`${classNameBLine}`}></p>
                    <input
                        data-theme="winter"
                        type='date'
                        className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `}
                        name="date" 
                        onChange={(e)=>handleOnChange(e, 0)}
                        value={transSheet[0]['date']}/>
                    
                </div>
                <div className={`${classNameContDesc} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>Description</p>
                    <p className={`${classNameBLine}`}></p>
                    <textarea
                        data-theme="winter"
                        rows={3}
                        className={`border py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                        name="description"
                        onChange={(e)=>handleOnChange(e, 0)}
                        value={transSheet[0]['description']}>
                    </textarea>
                </div>
                <div  className={`${classNameContRef} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>Reference</p>
                    <p className={`${classNameBLine}`}></p>
                    <input
                        data-theme="winter"
                        type='text'
                        className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                        name="reference"
                        placeholder='Ref'
                        onChange={(e)=>handleOnChange(e, 0)}
                        value={transSheet[0]['reference']}/>
                </div>
            </div>
                {transSheet?.map((dt, i)=>{
                    const personalAcctsSel =  getSubAccountsMultiEntry(dt.accountCode, chartOfAccountSelection, personalAccts, productsList);
                    let isQuantity = "";
                    if(personalAcctsSel?.length){
                        if(personalAcctsSel[1]?.type == "QUANTITY"){isQuantity = true}else{isQuantity = false};
                    }
                    //const personalAcctsSelCr =  getSubAccountsMultiEntry(dt.accountCode, chartOfAccountSelection, personalAccts);
                    //const personalAcctsSel = [];
                    //console.log(personalAcctsSel)
                    return(
                        <TransactionEntryRow 
                            hideTitle={i > 0} key={`${i}row`}
                            handleAddRemoveRow={()=>handleAddRemoveRow(dt, i)}
                            index={i}
                            handleOnChange={(e)=>handleOnChange(e, i)}
                            transSheet={transSheet}
                            classNameContSel={classNameContSel}
                            classNameContDrCr={classNameContDrCr}
                            classNameContSelSub={classNameContSelSub}
                            classNameContQuant={classNameContQuant}
                            classNameContAmount={classNameContAmount}
                            classNameContAdd={classNameContAdd}
                            chartOfAccounts={chartOfAccounts}
                            chartOfAccountSelection={chartOfAcctSelWithoutInvtControl}
                            personalAcctsList={personalAcctsList}
                            personalAcctsSel={personalAcctsSel || [{id:'', accountCode:'', accountName:'--No Sub Acct--', selectable:true}]} 
                            isQuantity={isQuantity}
                        />
                    )
                    })
                }
            <div className={`flex flex-row items-center justify-between ${classNameCont} w-[685px]`}>
                <div className={`flex-row whitespace-nowrap invisible items-center ${controlAcctTest?.isControlAcct? 'flex' : 'invisible'}`}>
                   <p className='text-red-950 text-right font-bold'>{controlAcctTest?.controlAcct} due date</p> 
                   <DropdownComponent 
                        selectedOption={selectedDueDate} 
                        setSelectedOption={setSelectedDueDate}
                        contStyle={'ml-3'}
                    />
                </div>

               <input data-theme="winter" className={`border border-gray-400 p-2 w-[150px] ${netAmount == 0 || netAmount == 'Total'? '' :'bg-red-100'}`}
                    placeholder='Total'
                    value={netAmount}
                    readOnly
                />
            </div>
           
    </div>
  )
}

export default TransactionRow;

const pesudoDiv = `<p type='submit' className='text-transparent w-[535px]'>
ALongLongPesudoTextToPreventShrinkingALongLongPesudoTextToPreventShrinkingALongLongPesudoTextToPreventShrinking
</p>`;

/*

 <div className={`flex flex-row items-center ${classNameCont}`}>
                <div className={`flex-row whitespace-nowrap items-center ${controlAcctTest?.isControlAcct? 'flex' : 'hidden'} w-[265px]`}>
                   <p className='text-red-950 text-right font-bold'>{controlAcctTest?.controlAcct} due date</p> 
                   <DropdownComponent 
                        selectedOption={selectedDueDate} 
                        setSelectedOption={setSelectedDueDate}
                        contStyle={'ml-3'}
                    />
                </div>

                <p type='submit' className={`text-transparent ${controlAcctTest?.isControlAcct? 'w-[270px]' : ' w-[535px]'}`}>
                   {controlAcctTest?.isControlAcct? "ALongLongPesudoTextToPreventShrinkingALongLongPesudoTextToPreventShrinkingALongLongLongLong" :
                    "ALongLongPesudoTextToPreventShrinkingALongLongPesudoTextToPreventShrinkingALongLongPesudo"}
                </p>
                <input data-theme="winter" className={`border border-gray-400 p-2 w-[150px] ${netAmount == 0 || netAmount == 'Total'? '' :'bg-red-100'}`}
                    placeholder='Total'
                    value={netAmount}
                    readOnly
                />
            </div>

*/