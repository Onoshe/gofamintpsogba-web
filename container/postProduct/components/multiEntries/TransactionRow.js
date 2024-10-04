import React from 'react';
import TransactionEntryRow from './TransactionEntryRow';
import { getSubAccountsMultiEntry } from '../utils/getSubAccountsMultiEntry';
import DropdownComponent from '@/components/forms/DropdownComponent';



const TransactionRow = ({styleTitle, hideTitle, index, transSheet, handleOnChange, handleAddRemoveRow, adjustProductChecked,
    chartOfAccounts, chartOfAccountSelection, personalAcctsList, personalAccts, productsList, netAmount,
    activeTab, componentReady, productBalance,  selectedDueDate, setSelectedDueDate, showDueDate}) => {
    const classNameTitle = `text-blue-900 border-y border-blue-600 font-bold bg-blue-100 -mr-2 p-3 mb-2 ${hideTitle? 'hidden' :''} ${styleTitle}`;
    const classNameBLine = `border-y border-gray-300  -mr-2 mb-2 ${hideTitle? '' :'hidden'}`;
    const classNameCont = `${'flex-shrink-0'}`;
    const classNameContDate = `w-[120px] mr-2`;
    const classNameContDesc = `w-2/3 max-w-[230px]  mr-2 text-gray-700`;
    const classNameContRef = `w-1/3 max-w-[120px] mr-2`;
    const classNameContSumAmount = `w-1/3 max-w-[130px] mr-2`;

    const classNameContSel = `w-[180px] mr-2`;
    const classNameContSelSub = `w-[160px] mr-2`;
    const classNameContQuant = `w-[70px] mr-2`;
    const classNameContUnits = `w-[90px] mr-2`;
    const classNameContAdd = `w-[30px] mx-3`;
    const classNameContDrCr = `w-[100px] mr-2`;
    const classNameContQuantBal= `w-[120px] mr-2`;
    //console.log(chartOfAccountSelection, personalAcctsList);
    
    //console.log(adjustProductChecked);
    let chartOfAccountInvt = chartOfAccountSelection?.filter((dt)=> dt.typeCode == '152');
    chartOfAccountInvt = [{accountCode:'', accountName:'--Select Inventory--', selectable:true, typeCode:'', typeName:'',id:''}, ...chartOfAccountInvt];
    //console.log(chartOfAccountInvt, chartOfAccountSelection)
   

    const getControlAcctsSel =(accountCode, q)=> {
        const res = getSubAccountsMultiEntry(accountCode, chartOfAccountSelection, personalAccts, productsList);
        if(q==="ISQUANTITY"){
            if(res?.length){
                return res[1]?.type === "QUANTITY";
                }
        }else{
            return res || [{id:'', accountCode:'', accountName:'--No Sub Acct--', selectable:true}];
        }
    };
    const tab3QtyAmnt = adjustProductChecked === "BYCOST"? 'Amount' : 'Quantity';    
  return (
    <div className='flex flex-col mb-3 '>
            
            <div className='flex flex-row'>
                <div className={`${classNameContDate} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>Date</p>
                    <p className={`${classNameBLine}`}></p>
                    <input
                        data-theme="winter"
                        type='date'
                        className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `}
                        name="date" 
                        onChange={(e)=>handleOnChange(e, 0)}
                        value={transSheet.date}/>
                    
                </div>
                <div className={`${classNameContDesc} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>Description</p>
                    <p className={`${classNameBLine}`}></p>
                    <textarea
                        //data-theme="winter"
                        rows={3}
                        className={`border py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                        name="description"
                        onChange={(e)=>handleOnChange(e, 0)}
                        value={transSheet?.description}>
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
                        value={transSheet.reference}/>
                </div>
                <div  className={`${classNameContSumAmount} ${classNameCont}`}>
                    <p className={`${classNameTitle}`}>{activeTab === "TAB3"? tab3QtyAmnt : "Amount"}</p>
                    <p className={`${classNameBLine}`}></p>
                    <input
                        data-theme="winter"
                        type={activeTab === "TAB3"? 'number' : 'text'}
                        className={`border  py-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                        name={"amount"}
                        placeholder={activeTab === "TAB3"? tab3QtyAmnt : 'Amount'}
                        onChange={(e)=>handleOnChange(e, 0)}
                        value={transSheet.amount}/>
                </div>
            </div>
            {componentReady?
            <>
               {activeTab === "TAB2" && 
                <TransactionEntryRow 
                    hideTitle={false}
                    //index={2}
                    handleOnChange={(e)=>handleOnChange(e, '2')}
                    transSheet={transSheet}
                    classNameContSel={`${classNameContSel} text-[navy]`}
                    classNameContDrCr={classNameContDrCr}
                    classNameContSelSub={`${classNameContSel} text-[navy]`}
                    classNameContQuant={`${classNameContQuant} text-[navy]`}
                    classNameContUnits={`${classNameContUnits} text-[navy]`}
                    classNameContAdd={classNameContAdd}
                    chartOfAccounts={chartOfAccounts}
                    chartOfAccountInvt={chartOfAccountInvt}
                    personalAcctsList={personalAcctsList}
                    
                    accountCodeValue={transSheet?.accountCodeProduct}
                    subCodeValue={transSheet?.subCodeProduct}
                    accountCodeName="accountCodeProduct" 
                    subCodeName="subCodeProduct"
                    quantityName="quantityProduct"
                    quantityValue={transSheet.quantityProduct}
                    unitsName="unitsProduct"

                    chartOfAccountSelection={chartOfAccountInvt}
                    personalAcctsSel={productsList}
                    isQuantity={true}
                    mainAcctTitle={acctTitle[2][0]}
                    subAcctTitle={acctTitle[2][1]}
                    quantityTitle={acctTitle[2][2]}
                    selectProduct="Product"
                    selectProductMB="mb-0"
                    unitsValue={activeTab==="TAB2"? transSheet?.amount/transSheet?.quantityProduct :'0'}
                />}
                {activeTab === "TAB2" && 
                <TransactionEntryRow 
                    //Cost of Sale Row - COS
                    hideTitle={false}
                    handleOnChange={(e)=>handleOnChange(e, '2')}
                    transSheet={transSheet}
                    classNameContSel={`w-[190px] text-red-900`}
                    classNameContDrCr={classNameContDrCr}
                    classNameContSelSub={classNameContQuant}
                    classNameContQuant={`w-[100px] mr-1 invisible`}
                    classNameContUnits={`hidden `}
                    classNameContAdd={classNameContAdd}
                    chartOfAccounts={chartOfAccounts}
                    chartOfAccountInvt={chartOfAccountInvt}
                    personalAcctsList={personalAcctsList}
                    
                    accountCodeValue={transSheet?.accountCodeCOS}
                    subCodeValue={transSheet?.subCodeProduct}
                    accountCodeName="accountCodeCOS" 
                    subCodeName="subCodeProduct"
                    quantityName="quantityProduct"
                    //quantityValue={transSheet.quantityProduct}
                    unitsName="unitsProduct"

                    chartOfAccountSelection={getChartOfAcct(0,chartOfAccountSelection, chartOfAccountInvt, 'TAB2-COS')}
                    personalAcctsSel={productsList}
                    isQuantity={true}
                    mainAcctTitle={acctTitle[3][0]}
                    subAcctTitle={acctTitle[2][1]}
                    quantityTitle={acctTitle[2][2]}
                    hideSubAcct
                    cosTitleStyle={`${classNameContSel} text-red-900 text-right pr-2`}
                    selectProduct="  "
                    selectProductMB="mb-5"
                    classNameContQuantBal={classNameContQuantBal}
                    quantityBalName="quantityBal"
                    quantityBal={productBalance}
                />}

                <TransactionEntryRow 
                    hideTitle={false}
                    //Debit Row: Tow with Receivable due date in TAB@
                    handleOnChange={(e)=>handleOnChange(e, '0')}
                    transSheet={transSheet}
                    classNameContSel={classNameContSel}
                    classNameContDrCr={classNameContDrCr}
                    classNameContSelSub={classNameContSelSub}
                    //classNameContQuant={classNameContQuant}
                    //classNameContUnits={classNameContUnits}
                    classNameContQuant={`${classNameContQuant} ${activeTab==="TAB2" || activeTab==="TAB3"? 'hidden':'' }`} //Hide qantity & units column to create space for Due date
                    classNameContUnits={`${classNameContUnits} ${activeTab==="TAB1"? '':'hidden' }`}
                    classNameContAdd={classNameContAdd}
                    chartOfAccounts={chartOfAccounts}
                    personalAcctsList={personalAcctsList}
                    accountCodeValue={transSheet.accountCodeDr}
                    subCodeValue={transSheet.subCodeDr}
                    accountCodeName="accountCodeDr" 
                    subCodeName="subCodeDr"
                    quantityName="quantityDr"
                    unitsName="unitsDr"
                    tab2ShowDueDate={activeTab==="TAB2"}
                    selectedDueDate={selectedDueDate}
                    setSelectedDueDate={setSelectedDueDate}
                    showDueDate={showDueDate}
                    
                    //chartOfAccountSelection={chartOfAccountInvt}
                    chartOfAccountSelection={activeTab==="TAB3"? chartOfAccountInvt : getChartOfAcct(0,chartOfAccountSelection, chartOfAccountInvt, activeTab)}
                    personalAcctsSel={getControlAcctsSel(transSheet.accountCodeDr)}
                    isQuantity={getControlAcctsSel(transSheet.accountCodeDr,'ISQUANTITY')}
                    mainAcctTitle={acctTitle[0][0]}
                    subAcctTitle={acctTitle[0][1]}
                    quantityTitle={acctTitle[0][2]}
                    quantityValue={transSheet.quantityDr}
                    quantStyle={activeTab==="TAB2"? 'text-transparent' :''}
                    unitsStyle={activeTab==="TAB2"? 'text-transparent' :''}
                    unitsValue={activeTab==="TAB1"? transSheet.amount/transSheet.quantityDr :'0'}

                    //classNameContDrCr
                    entryName="entry1Sel"
                    entryValue={transSheet.entry1Sel}
                    showDrCrSelection={activeTab === "TAB3"}
                />
                 <TransactionEntryRow 
                    hideTitle={false}
                    index={1}
                    handleOnChange={(e)=>handleOnChange(e, '1')}
                    transSheet={transSheet}
                    classNameContSel={classNameContSel}
                    classNameContDrCr={classNameContDrCr}
                    classNameContSelSub={classNameContSelSub}
                    classNameContQuant={`${classNameContQuant} ${activeTab==="TAB2" || activeTab==="TAB3"? 'invisible':'' }`}
                    classNameContUnits={`${classNameContUnits} ${activeTab==="TAB1"? '':'invisible' }`}
                    classNameContAdd={classNameContAdd}
                    chartOfAccounts={chartOfAccounts}
                    personalAcctsList={personalAcctsList}
                    accountCodeValue={transSheet.accountCodeCr}
                    subCodeValue={transSheet.subCodeCr}
                    accountCodeName="accountCodeCr" 
                    subCodeName="subCodeCr"
                    quantityName="quantityCr"
                    unitsName="unitsCr"

                    chartOfAccountSelection={getChartOfAcct(1, chartOfAccountSelection, chartOfAccountInvt, activeTab)}
                    personalAcctsSel={getControlAcctsSel(transSheet.accountCodeCr)}
                    isQuantity={getControlAcctsSel(transSheet.accountCodeCr,'ISQUANTITY')}
                    mainAcctTitle={acctTitle[1][0]}
                    subAcctTitle={acctTitle[1][1]}
                    quantityTitle={acctTitle[1][2]}
                    quantityValue={transSheet.quantityCr}
                    drCr="Credit"
                    quantStyle={activeTab==="TAB1"? 'text-transparent' :''}
                    unitsStyle={activeTab==="TAB1"? 'text-transparent' :''}
                    unitsValue={activeTab==="TAB2"? transSheet.amount/transSheet.quantityCr :'0'}
                     
                     //classNameContDrCr
                     entryName="entry2Sel"
                     entryValue={transSheet.entry2Sel}
                     showDrCrSelection={activeTab === "TAB3"}
                />

            <div className={`w-fit flex-row hidden`}>
                   <p className='text-red-950'>{showDueDate.type} due date</p>
                    <DropdownComponent 
                        selectedOption={selectedDueDate} 
                        setSelectedOption={setSelectedDueDate}
                        contStyle="w-[60%]"/>
            </div>   
            <div className={`flex-row items-center flex ${classNameCont} hidden`}>
                <p type='submit' className='text-transparent w-[530px]'>
                   ALongLongPesudoTextToPreventShrinkingALongLongPesudoTextToPreventShrinkingALongLongPesudo
                </p>
                <input data-theme="winter" className={`border border-gray-400 p-2 w-[150px] ${netAmount == 0 || netAmount == 'Total'? '' :'bg-red-100'}`}
                    placeholder='Total'
                    value={netAmount}
                    readOnly
                />
            </div>
         </>
         :<p>Loading</p>
        }
    </div>
  )
}

export default TransactionRow;

function getChartOfAcct(i, chartOfAccountSelection, chartOfAccountInvt, activeTab){
    const inventryCode = 152;
    const cosCode = 511;

    let returnOpts = chartOfAccountSelection;
    let coaSelWithoutInvtControl = [...chartOfAccountSelection].filter((dt)=> dt?.typeCode != inventryCode);
    coaSelWithoutInvtControl = coaSelWithoutInvtControl.filter((dt)=> dt?.code != inventryCode);
    
    let coaSelCostOfSaleOnly = [...chartOfAccountSelection].filter((dt)=> dt?.typeCode == cosCode);
    coaSelCostOfSaleOnly = [chartOfAccountSelection[0], ...coaSelCostOfSaleOnly];
    
    //console.log(coaSelWithoutInvtControl)
    if(activeTab === "TAB1"){
        if(i == 0){
            returnOpts =  chartOfAccountInvt;
        }else{
            returnOpts = coaSelWithoutInvtControl
        }
    }else if(activeTab === "TAB2"){
        returnOpts = coaSelWithoutInvtControl
    }else if(activeTab === "TAB3"){ 
        returnOpts = chartOfAccountSelection
    }else if(activeTab === "TAB2-COS"){
        returnOpts = coaSelCostOfSaleOnly
    } 
    return returnOpts
}

var acctTitle =[
    ["Select Account", "Sub Account", "Quantity"],
    ["Select Account", "Sub Account", "Quantity"],
    ["Select Account", "Product sold", "Quantity"],
    ["Select COS Account", "Product sold", "Quantity"]
]