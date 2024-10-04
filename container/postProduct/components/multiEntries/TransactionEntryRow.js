import React from 'react';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import SelectionMainAccount from '../generalComponents/SelectionMainAccount';
import SelectionSubAccount from '../generalComponents/SelectionSubAccount';
import DropdownComponent from '@/components/forms/DropdownComponent';




const TransactionEntryRow = ({ hideTitle, hideText,mainAcctTitle, subAcctTitle,quantityTitle,hideSubAcct,cosTitleStyle,
    handleOnChange,  classNameBLine, classNameCont, classNameContSel, classNameContSelSub, classNameContUnits, 
    classNameContQuant,  chartOfAccountSelection, personalAcctsSel, isQuantity, selectProduct, quantityValue, selectProductMB,
    accountCodeValue, subCodeValue, accountCodeName, subCodeName, quantityName, unitsName, drCr, quantStyle, 
    unitsStyle, unitsValue, classNameContQuantBal, quantityBalName, quantityBal,  tab2ShowDueDate, 
    showDueDate, selectedDueDate, setSelectedDueDate, classNameContDrCr, showDrCrSelection, entryValue, entryName}) => {
    

    const value = drCr || "Debit"; //transSheet[index]['debitCredit'] ==1? 'Debit': transSheet[index]['debitCredit'] == 2? 'Credit' :'Select';
  return (
        <div className={`flex flex-row w-fit ${selectProduct? `bg-gray-200 py-2 rounded-md pr-2 ${selectProductMB}` : 'mb-3'}`}>
            <div  className={`w-[70px]`}>
                <p className={`text-transparent ${hideTitle? 'hidden' :''}`}>Debit</p>
                
               {//Debit /Credit
                showDrCrSelection? <input
                    data-theme="winter"
                    type=''
                    className={`py-2 pr-2 font-bold rounded-md border-gray-400 w-full ${entryValue==2? 'text-red-800' : 'text-teal-900 bg-white'}`} 
                    name="entrySel"
                    value={entryValue==1? "Debit" : entryValue == 2? "Credit" : "Select"}
                    />
                 :<input
                    data-theme="winter"
                    type='submit'
                    className={`py-2 pr-2 font-bold rounded-md border-gray-400 w-full ${selectProduct? 'bg-transparent' : value == 'Debit'? 'text-teal-900 bg-white' : value == 'Credit'? 'text-red-500 bg-white' :'text-blue-900 bg-white'}`} 
                    name="amount"
                    value={selectProduct || value}/>
                }
            </div>
            {hideSubAcct && <span className={cosTitleStyle}>Charge Cost of Sale (COS) to:</span>}
            {showDrCrSelection && <SelectionMainAccount
                    title="Select Dr/Cr" 
                    classNameCont={classNameCont} 
                    classNameTitle={`${hideTitle? 'hidden' :''}`} 
                    options={[{accountCode:0, accountName:'--Select--', selectable:true}, {accountCode:1, accountName:'Debit', selectable:true}, {accountCode:2, accountName:'Credit',  selectable:true}]}
                    classNameContSel={classNameContDrCr}
                    classNameBLine={classNameBLine}
                    name={entryName}
                    onChange={handleOnChange}
                    value={entryValue}
                    selType="DRCR"
                />}
                <SelectionMainAccount
                    title={mainAcctTitle} 
                    classNameCont={classNameCont}
                    classNameTitle={`${hideTitle? 'hidden' :''}`}
                    options={chartOfAccountSelection}
                    classNameContSel={classNameContSel}
                    classNameBLine={classNameBLine}
                    name={accountCodeName}
                    onChange={handleOnChange}
                    value={accountCodeValue}
                />
                
                {hideSubAcct && 
                      <div className='flex-row ml-[30px] bg-gray-100 p-2'>
                        <div  className={`${classNameContQuantBal} ${classNameCont}`}>
                            <p className={`${quantStyle} text-[navy]`}>Quantity left</p>
                            <input
                                data-theme="winter"
                                type='number'
                                className={`border  py-2 px-2 rounded-md border-gray-400 w-full ${quantityBal?.bal < 0? 'bg-red-200' :'bg-white'}`} 
                                name={quantityBalName}
                                placeholder={'Quantity balance'}
                                min="0"
                                readOnly={'readOnly'}
                                //onChange={handleOnChange}
                                value={quantityBal?.bal}
                            />
                        </div>
                        <div  className={`${classNameContQuantBal} ${classNameCont}`}>
                            <p className={`${quantStyle} text-[navy]`}>Unit Cost</p>
                            <input
                                data-theme="winter"
                                type='number'
                                className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white`} 
                                name={quantityBalName}
                                placeholder={'Unit Cost'}
                                min="0"
                                readOnly={'readOnly'}
                                //onChange={handleOnChange}
                                value={quantityBal?.price}
                            />
                        </div>
                    </div>
                }
                
                
                {hideSubAcct? <></>
                   :<SelectionSubAccount
                    title={subAcctTitle} 
                    classNameCont={classNameCont} 
                    classNameTitle={`${hideTitle? 'hidden' :''} `}
                    options={personalAcctsSel}
                    classNameContSelSub={classNameContSelSub}
                    classNameBLine={classNameBLine}
                    name={subCodeName}
                    onChange={handleOnChange}
                    value={subCodeValue}
                />}
                <div  className={`bg-red-300 hidden`}>
                    <p className={` text-[navy]`}>Receivable due date</p>
                    <input
                        data-theme="winter"
                        type='number'
                        className={`border  py-2 px-2 rounded-md border-gray-400 w-full`} 
                        name={quantityBalName}
                        placeholder={'Quantity balance'}
                        min="0"
                        readOnly={'readOnly'}
                        //onChange={handleOnChange}
                        value={quantityBal?.bal}
                    />
                </div>
                <div className={` ml-3 flex-col  hidden`}>
                   <p className='text-red-950'>{'Receivable'} due date</p>
                    <DropdownComponent
                        selectedOption={selectedDueDate} 
                        setSelectedOption={setSelectedDueDate}
                        contStyle={'w-full'}
                        />
                </div>   
                {hideSubAcct? <></> 
                 :<>
                    <div  className={`${classNameContQuant} ${classNameCont}`}>
                        <p className={`${hideTitle? 'hidden' :''} ${quantStyle} `}>{quantityTitle}</p>
                        <p className={`${classNameBLine}`}></p>
                        <input
                            data-theme="winter"
                            type='number'
                            className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                            name={quantityName}
                            placeholder={isQuantity? 'Quantity' : '---'}
                            min="0"
                            readOnly={isQuantity? '' :'readOnly'}
                            onChange={handleOnChange}
                            value={quantityValue}
                        />
                    </div>
                    <div  className={`${classNameContUnits} ${classNameCont}`}>
                        <p className={`${hideTitle? 'hidden' :''} ${unitsStyle}`}>Unit price</p>
                        <p className={`${classNameBLine}`}></p>
                        <input
                            data-theme="winter"
                            type='number'
                            className={`border py-2 px-2 rounded-md border-gray-400 w-full bg-gray-100 ${value == 'Debit'? 'text-teal-900' : value == 'Credit'? 'text-red-500' :'text-blue-900'}`} 
                            name={unitsName}
                            placeholder='Unit price'
                            readOnly={'readOnly'}
                            //min="0"
                            //onChange={handleOnChange}
                            value={unitsValue}
                            />
                    </div>
                </>}
            </div>
  )
}

export default TransactionEntryRow;