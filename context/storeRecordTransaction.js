import {create} from "zustand";



const useStoreRecordTransaction = create((set) => ({
    recordTransaction:{activeTab:'TWOENTRY', createByEntry:'BYENTRY', editTran:false, editDetails:{}, transRow:[]}, 
    tranSheetTwoEntry: [{date:'', description:'', debitAccount:'', creditAccount:'', debitSub:'', creditSub:'', reference:'', amount:'', dueDate:''}],
    tranSheetMultiEntry:[{debitCredit:1, date:"", reference:'', description:'', accountCode:'', subCode:'', amount:'', dueDate:''}, {debitCredit:2, accountCode:'', subCode:'', amount:'',dueDate:''}], 
    tranSheetJournals: [{debitCredit:1, date:"", reference:'', description:'', accountCode:'', subCode:'', amount:'', dueDate:''}, {debitCredit:2, accountCode:'', subCode:'', amount:'',dueDate:''}],
    tranSheetProducts: {date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:'',accountCodeProduct:'', subCodeProduct:'', quantityProduct:'',unitsProduct:'', accountCodeCOS:'', quantityBal:'', dueDate:'', entry1Sel:1, entry2Sel:2,adjustProductChecked:"BYQTY"},
    productPageActiveTab:"TAB1",

    dispatchRecordTransaction: (act) => set((state) => ({
        recordTransaction: act,
    })),
    dispatchTranSheetTwoEntry: (act) => set((state) => ({
        tranSheetTwoEntry: act,
    })),
    dispatchTranSheetMultiEntry: (act) => set((state) => ({
        tranSheetMultiEntry: act,
    })),
    dispatchTranSheetJournals: (act) => set((state) => ({
        tranSheetJournals: act,
    })),
    dispatchTranSheetProducts: (act) => set((state) => ({
        tranSheetProducts: act,
    })),
    dispatchProductPageActiveTab: (act) => set((state) => ({
        productPageActiveTab: act,
    })),
    dispatchTranSheetTwoEntryReset: (act) => set((state) => ({
        tranSheetTwoEntry: [{date:'', description:'', debitAccount:'', creditAccount:'', debitSub:'', creditSub:'', reference:'', amount:'',dueDate:''}],
        recordTransaction:{activeTab:'TWOENTRY', createByEntry:'BYENTRY', editTran:false, editDetails:{}},
    })),
    dispatchTranSheetMultiEntryReset: (act) => set((state) => ({
        tranSheetMultiEntry: [{debitCredit:1, date:"", reference:'', description:'', accountCode:'', subCode:'', amount:'', dueDate:''}, {debitCredit:2, accountCode:'', subCode:'', amount:'',dueDate:''}], 
        tranSheetJournals: [{debitCredit:1, date:"", reference:'', description:'', accountCode:'', subCode:'', amount:'', dueDate:''}, {debitCredit:2, accountCode:'', subCode:'', amount:'',dueDate:''}], 
        recordTransaction:{activeTab:'TWOENTRY', createByEntry:'BYENTRY', editTran:false, editDetails:{}},
    })),
    dispatchTranSheetProductsReset: (act) => set((state) => ({
        tranSheetProducts: {date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:'',accountCodeProduct:'', subCodeProduct:'', quantityProduct:'',unitsProduct:'', accountCodeCOS:'', quantityBal:'', dueDate:''}, 
        recordTransaction:{activeTab:'TWOENTRY', createByEntry:'BYENTRY', editTran:false, editDetails:{}},
    })),
}));

export default useStoreRecordTransaction;