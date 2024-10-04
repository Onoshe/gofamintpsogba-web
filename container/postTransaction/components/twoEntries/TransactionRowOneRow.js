import React from 'react';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import SelectionMainAccount from '../generalComponents/SelectionMainAccount';
import SelectionSubAccount from '../generalComponents/SelectionSubAccount';



const TransactionRow = ({styleTitle, hideTitle, handleAddRemoveRow, transSheet, handleOnChange,index, chartOfAccounts,chartOfAccountSelection, 
    personalAcctsSelDr, personalAcctsSelCr, controlAcctsCode}) => {
    const classNameTitle = `text-blue-900 border-y border-blue-600 font-bold bg-blue-100 -mr-2 p-3 mb-2 ${hideTitle? 'hidden' :''} ${styleTitle}`;
    const classNameBLine = `border-y border-gray-300  -mr-2 mb-2 ${hideTitle? '' :'hidden'}`;
    const classNameCont = `${'flex-shrink-0'}`;
    const classNameContDate = `w-[100px] mr-2 3xl:w-[130px]`;
    const classNameContDesc = `w-[150px] mr-2 lg:w-[180px]`;
    const classNameContSel = `w-[150px] mr-2 lg:w-[180px]`;
    const classNameContSelSub = `w-[100px] mr-2 lg:w-[130px]`;
    const classNameContRef = `w-[100px] mr-2 lg:w-[130px]`;
    const classNameContAmount = `w-[100px] lg:w-[130px]`;
    const classNameContAdd = `w-[30px] mx-3`;
    
    
    const chartOfAcctSelWithoutInvtControl = chartOfAccountSelection?.filter((dt)=> ![parseInt(dt?.typeCode) || 0, parseInt(dt?.code) || 0].includes(parseInt(controlAcctsCode.inventoryControl)));
     
    return (
    <div className='flex flex-row px-3 py-1'>
            <div className={`${classNameContDate} ${classNameCont}`}>
                <p className={`${classNameTitle}`}>Date</p>
                <p className={`${classNameBLine}`}></p>
                <input
                    data-theme="winter"
                    type='date'
                    className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `}
                    name="date" 
                    onChange={handleOnChange}
                    value={transSheet[index]['date']}/>
                
            </div>
            <div className={`${classNameContDesc} ${classNameCont}`}>
                <p className={`${classNameTitle}`}>Description</p>
                <p className={`${classNameBLine}`}></p>
                <textarea
                    data-theme="winter"
                    rows={3}
                    className={`border py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                    name="description"
                    placeholder='Transaction description...'
                    onChange={handleOnChange}
                    value={transSheet[index]['description']}>
                </textarea>
            </div>
            <SelectionMainAccount
                title="Debit Account" 
                classNameCont={classNameCont} 
                classNameTitle={classNameTitle} 
                options={chartOfAcctSelWithoutInvtControl}
                classNameContSel={classNameContSel}
                classNameBLine={classNameBLine}
                name="debitAccount"
                onChange={handleOnChange}
                value={transSheet[index]['debitAccount']}
            />
            <SelectionSubAccount
                title="Dr Sub" 
                classNameCont={classNameCont} 
                classNameTitle={classNameTitle} 
                options={personalAcctsSelDr}
                classNameContSelSub={classNameContSelSub}
                classNameBLine={classNameBLine}
                name="debitSub"
                onChange={handleOnChange}
                value={transSheet[index]['debitSub']}
            />
            <SelectionMainAccount
                title="Credit Account" 
                classNameCont={classNameCont} 
                classNameTitle={classNameTitle} 
                options={chartOfAcctSelWithoutInvtControl}
                classNameContSel={classNameContSel}
                classNameBLine={classNameBLine}
                name="creditAccount"
                onChange={handleOnChange}
                value={transSheet[index]['creditAccount']}
            />
            <SelectionSubAccount
                title="Cr Sub" 
                classNameCont={classNameCont} 
                classNameTitle={classNameTitle} 
                options={personalAcctsSelCr}
                classNameContSelSub={classNameContSelSub}
                classNameBLine={classNameBLine}
                name="creditSub"
                onChange={handleOnChange}
                value={transSheet[index]['creditSub']}
            />
            <div  className={`${classNameContRef} ${classNameCont}`}>
                <p className={`${classNameTitle}`}>Reference</p>
                <p className={`${classNameBLine}`}></p>
                <input
                    data-theme="winter"
                    type='text'
                    className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                    name="reference"
                    placeholder='Ref'
                    onChange={handleOnChange}
                    value={transSheet[index]['reference']}/>
            </div>
            <div  className={`${classNameContAmount} ${classNameCont}`}>
                <p className={`${classNameTitle}`}>Amount</p>
                <p className={`${classNameBLine}`}></p>
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
            <div className={`${classNameContAdd} ${classNameCont}`}>
                <p className={`${classNameTitle} mb-2 ${hideTitle && 'hidden'}`}><span className='rotate-90'>...</span></p>
                <p className={`${classNameBLine}`}></p>
                {index === 0?
                    <BsPlusCircle className='text-blue-800 ml-2' size={24}
                        onClick={handleAddRemoveRow}/>
                 :<BsDashCircle  className='text-red-500 ml-2' size={24}
                        onClick={handleAddRemoveRow}/>
                 }
            </div>
    </div>
  )
}

export default TransactionRow;