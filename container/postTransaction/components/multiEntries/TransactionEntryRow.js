import React from 'react';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import SelectionMainAccount from '../generalComponents/SelectionMainAccount';
import SelectionSubAccount from '../generalComponents/SelectionSubAccount';




const TransactionEntryRow = ({handleAddRemoveRow, index, transSheet, hideTitle, hideText,
    handleOnChange, classNameTitle, classNameBLine, classNameCont, classNameContSel,classNameContDrCr, classNameContSelSub, classNameContAmount, 
    classNameContAdd,classNameContQuant, chartOfAccounts, chartOfAccountSelection, personalAcctsSel, isQuantity}) => {
    

    const value = transSheet[index]['debitCredit'] ==1? 'Debit': transSheet[index]['debitCredit'] == 2? 'Credit' :'Select';
  return (
        <div className='flex flex-row mb-3 w-fit'>
            <div  className={`w-[70px]`}>
                <p className={`text-transparent ${hideTitle? 'hidden' :''}`}>Debit</p>
                <input
                    data-theme="winter"
                    type='submit'
                    className={`py-2 pr-2 font-bold rounded-md border-gray-400 w-full bg-white ${value == 'Debit'? 'text-teal-900' : value == 'Credit'? 'text-red-500' :'text-blue-900'}`} 
                    name="amount"
                    value={value}/>
            </div>
                <SelectionMainAccount
                    title="Select Dr/Cr" 
                    classNameCont={classNameCont} 
                    classNameTitle={`${hideTitle? 'hidden' :''}`} 
                    options={[{accountCode:0, accountName:'--Select--', selectable:true}, {accountCode:1, accountName:'Debit', selectable:true}, {accountCode:2, accountName:'Credit',  selectable:true}]}
                    classNameContSel={classNameContDrCr}
                    classNameBLine={classNameBLine}
                    name="debitCredit"
                    onChange={handleOnChange}
                    value={transSheet[index]['debitCredit']}
                    selType="DRCR"
                />
                <SelectionMainAccount
                    title="Select Account" 
                    classNameCont={classNameCont} 
                    classNameTitle={`${hideTitle? 'hidden' :''}`} 
                    options={chartOfAccountSelection}
                    classNameContSel={classNameContSel}
                    classNameBLine={classNameBLine}
                    name="accountCode"
                    onChange={handleOnChange}
                    value={transSheet[index]['accountCode']}
                />
                <SelectionSubAccount
                    title="Select Sub" 
                    classNameCont={classNameCont} 
                    classNameTitle={`${hideTitle? 'hidden' :''}`}
                    options={personalAcctsSel}
                    classNameContSelSub={classNameContSelSub}
                    classNameBLine={classNameBLine}
                    name="subCode"
                    onChange={handleOnChange}
                    value={transSheet[index]['subCode']}
                />
                <div  className={`${classNameContQuant} ${classNameCont} hidden`}>
                    <p className={`${`${hideTitle? 'hidden' :''}`}`}>Quantity</p>
                    <p className={`${classNameBLine}`}></p>
                    <input
                        data-theme="winter"
                        type='number'
                        className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                        name="quantity"
                        placeholder={isQuantity? 'Quantity' : '---'}
                        min="0"
                        readOnly={isQuantity? '' :'readOnly'}
                        onChange={handleOnChange}
                        value={isQuantity? transSheet[index]['quantity'] : '---'}/>
                </div>
                <div  className={`${classNameContAmount} ${classNameCont}`}>
                    <p className={`${`${hideTitle? 'hidden' :''}`}`}>Amount</p>
                    <p className={`${classNameBLine}`}></p>
                    <input
                        data-theme="winter"
                        type='number'
                        className={`border py-2 px-2 rounded-md border-gray-400 w-full bg-white ${value == 'Debit'? 'text-teal-900' : value == 'Credit'? 'text-red-500' :'text-blue-900'}`} 
                        name="amount"
                        placeholder='Amount'
                        min="0"
                        onChange={handleOnChange}
                        value={transSheet[index]['amount']}/>
                </div>
                <div className={`${classNameContAdd} ${classNameCont}`}>
                    <p className={`${classNameTitle} mb-2 ${`${hideTitle? 'hidden' :''}`}`}><span className='rotate-90'>...</span></p>
                    <p className={`${classNameBLine}`}></p>
                    {index === 0?
                        <BsPlusCircle className='text-blue-800 ml-2 active:scale-95 cursor-pointer' size={24}
                            onClick={handleAddRemoveRow}/>
                       : index === 1? <div></div>
                         :<BsDashCircle  className='text-red-500 ml-2 active:scale-95 cursor-pointer' size={24}
                            onClick={handleAddRemoveRow}/>
                    }
                </div>
            </div>
  )
}

export default TransactionEntryRow;