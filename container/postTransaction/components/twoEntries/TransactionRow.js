'use client'
import React from 'react';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import SelectionMainAccount, { SelectionMainAccountShell } from '../generalComponents/SelectionMainAccount';
import SelectionSubAccount from '../generalComponents/SelectionSubAccount';
import DropdownComponent from '@/components/forms/DropdownComponent';



const TransactionRow = ({styleTitle, hideTitle, handleAddRemoveRow, transSheet, handleOnChange,index, chartOfAccounts,chartOfAccountSelection, 
    personalAcctsSelDr, personalAcctsSelCr, controlAcctsCode, classNameRowCont, recordTransaction, controlAcctChecker, setTransSheet,}) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [selectedDueDate, setSelectedDueDate] = React.useState({value:30, label:'30 Days'});
    
    //console.log(transSheet)
    const classNameTitle = `text-blue-900 border-y border-blue-600 font-bold bg-blue-100 whitespace-nowrap -mr-2 p-3 mb-2 ${hideTitle? 'hidden' :''} ${styleTitle}`;
    const classNameBLine = `border-y border-gray-300  -mr-2 my-4 ${hideTitle? '' :'hidden'}`;
    const classNameCont = `${'flex-shrink-0'}`;
    const classNameContDate = `w-[100px] mr-2 3xl:w-[130px]`;
    const classNameContDesc = `w-[150px] mr-2 lg:w-[180px]`;
    const classNameContSel = `w-[150px] mr-2 lg:w-[180px]`;
    const classNameContSelSub = `w-[120px] mr-2 lg:w-[150px]`;
    const classNameContRef = `w-[120px] mr-2 lg:w-[150px]`;
    const classNameContAmount = `w-[120px] lg:w-[150px]`;
    const classNameContAdd = `w-[30px] mx-3`;
    

    const chartOfAcctSelWithoutInvtControl = chartOfAccountSelection?.filter((dt)=> ![parseInt(dt?.typeCode) || 0, parseInt(dt?.code) || 0].includes(parseInt(controlAcctsCode.inventoryControl)) &&
    ![parseInt(dt?.typeCode) || 0, parseInt(dt?.code) || 0].includes(parseInt(controlAcctsCode.inventoryAdj)));
    
    //console.log(transSheet);

    //const getControlAcct =(idx)=>{
        const isRecControl = controlAcctChecker(transSheet, 'debitAccount', 'receivables', index);
        const isPayControl = controlAcctChecker(transSheet, 'creditAccount', 'payables', index);
   // }
    //console.log(transSheet, selectedDueDate)
    const handleAddRemoveRowHandler =()=>{
        if(!recordTransaction?.editTran){
            handleAddRemoveRow()
        }
    };

    const updateTransSheetDueDate = (val, idx, type)=>{
        const transSht = transSheet[idx];
        const updatedRow = {...transSht, dueDate:val, dueDateType:type || ""};
        const updatedRows = [...transSheet];
        updatedRows[idx] = updatedRow;
        setTransSheet(updatedRows);
      };
    React.useEffect(()=>{
        if(isRecControl || isPayControl){
            if(selectedDueDate?.value){
                updateTransSheetDueDate(selectedDueDate.value, index, isRecControl? "REC" : "PAY");
            }else{updateTransSheetDueDate("", index)}
        }else{updateTransSheetDueDate("", index)}
    },[isRecControl, isPayControl, selectedDueDate]);


    React.useEffect(() => {
        setIsMounted(true);

        //Set dueDate from transSheet on mounted, especially during edit 
        if(transSheet[0].dueDate){setSelectedDueDate({value:transSheet[0].dueDate, label:`${transSheet[0].dueDate} Days`})}
    }, []);
    
    if (!isMounted) {
        //return null; // Or some placeholder
    }

    return (
    <div className={`flex flex-col`}>
        <div className={`flex flex-row px-3 py-1 ${classNameRowCont}`}>
            <div>
                <div className='flex flex-row'>
                    <div className={`${classNameContDate} ${classNameCont}`}>
                        <p className={`${classNameTitle}`}>Date</p>
                        <p className={`${classNameBLine}`}></p>
                        <input
                            data-theme="winter"
                            type='date'
                            className={`border  py-2 px-1 rounded-md border-gray-400 w-[105px] bg-white `}
                            name="date" 
                            onChange={handleOnChange}
                            value={transSheet[index]['date']}/>
                        
                    </div>
                    <div className={`${classNameContDesc} ${classNameCont}`}>
                        <p className={`${classNameTitle}`}>Description</p>
                        <p className={`${classNameBLine}`}></p>
                        
                        {isMounted?
                            <TextArea
                                handleOnChange={handleOnChange}
                                transSheet={transSheet}
                                index={index}
                        />
                        :<input className={`border py-2 px-2 rounded-md border-gray-400 w-full bg-white`} />}
                        
                    </div>
                </div>
                <div className={`flex-row hidden`}>
                   <p className='text-red-950 font-bold text-right'>Select {isRecControl? 'Receivable' : 'Payable'} due date</p>
                    <DropdownComponent 
                        selectedOption={selectedDueDate} 
                        setSelectedOption={setSelectedDueDate}
                        contStyle={'w-[60%]'}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <SelectionMainAccount
                    title="Account to" 
                    classNameCont={classNameCont} 
                    classNameTitle={classNameTitle} 
                    options={chartOfAcctSelWithoutInvtControl}
                    classNameContSel={classNameContSel}
                    classNameBLine={classNameBLine}
                    name="debitAccount"
                    onChange={handleOnChange}
                    value={transSheet[index]['debitAccount']}
                    titleDrCr="Debit"
                />
                <SelectionMainAccount
                    title="Credit Account" 
                    classNameCont={classNameCont} 
                    classNameTitle={'hidden'} 
                    options={chartOfAcctSelWithoutInvtControl}
                    classNameContSel={classNameContSel}
                    classNameBLine={'hidden'}
                    name="creditAccount"
                    onChange={handleOnChange}
                    value={transSheet[index]['creditAccount']}
                    titleDrCr="Credit" 
                    //titleDrCrStyle
                />
            </div>
            <div className='flex flex-col gap-2'>
                <SelectionSubAccount
                    title="Sub Account to" 
                    classNameCont={classNameCont} 
                    classNameTitle={classNameTitle} 
                    options={personalAcctsSelDr}
                    classNameContSelSub={classNameContSelSub}
                    classNameBLine={classNameBLine}
                    name="debitSub"
                    onChange={handleOnChange}
                    value={transSheet[index]['debitSub']}
                    titleDrCr="Debit"
                />
                
                <SelectionSubAccount
                    title="Cr Sub" 
                    classNameCont={classNameCont} 
                    classNameTitle={'hidden'}
                    options={personalAcctsSelCr}
                    classNameContSelSub={classNameContSelSub}
                    classNameBLine={'hidden'}
                    name="creditSub"
                    onChange={handleOnChange}
                    value={transSheet[index]['creditSub']}
                    titleDrCr="Credit"
                />
            </div>
            <div className='flex flex-col gap-2'>
                <div  className={`${classNameContRef} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>Reference</p>
                    <p className={`${classNameBLine}`}></p>
                    <div className='flex flex-col'>
                        <span className={`text-blue-800 pr-2 font-bold pl-1`}>Reference</span>
                        <input
                            data-theme="winter"
                            type='text'
                            className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                            name="reference"
                            placeholder='Ref'
                            onChange={handleOnChange}
                            value={transSheet[index]['reference']}/>
                    </div>
                </div>
                <div  className={`${classNameContAmount} ${classNameCont}`}>
                    <p className={`${classNameTitle} hidden`}>Amount</p>
                    <p className={`hidden`}></p>
                    <div className='flex flex-col'>
                        <span className={`text-blue-800 pr-2 font-bold pl-1`}>Amount</span>
                        <input
                            data-theme="winter"
                            type='number'
                            className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                            name="amount"
                            placeholder='Amount'
                            min="0"
                            onChange={handleOnChange}
                            value={transSheet[index]['amount']}/>
                    </div>
                </div>
            </div>
            <div className={`${classNameContAdd} ${classNameCont}`}>
                <p className={`${classNameTitle} mb-2 ${hideTitle && 'hidden'}`}><span className='rotate-90'>...</span></p>
                <p className={`${classNameBLine}`}></p>
                {index === 0?
                    <BsPlusCircle className={`${recordTransaction?.editTran? '' : 'text-blue-800 ml-2 active:scale-95 cursor-pointer'}`} size={24}
                        onClick={handleAddRemoveRowHandler}/>
                 :<BsDashCircle  className='text-red-500 ml-2 active:scale-95 cursor-pointer' size={24}
                        onClick={handleAddRemoveRow}/>
                 }
            </div>
        </div>
        <p className={`text-red-800 px-3 font-bold hidden`}>
            Default {isRecControl? 'Receivable' : 'Payable'} due date is 30 days.
        </p>
    </div>
  )
}



function TextArea({handleOnChange, transSheet, index}){
    
    return(
        <textarea
            //data-theme="winter"
            rows={3}
            className={`border py-2 px-2 text-gray-700 rounded-md border-gray-400 w-full bg-white `} 
            name="description"
            placeholder='Transaction description...'
            onChange={handleOnChange}
            value={transSheet[index]['description']}
            ></textarea>
    )
}
export default TransactionRow;