import {create} from "zustand";
//import { chartOfAccount } from "@/admin/modules/chartOfAccount";
import { initRow, initRowSingle } from "@/pagesContainer/company/postTransaction/postForm/modules/handleAddRemoveRow";
//import { creditorsLists, debtorsLists, drAcctOpts, crAcctOpts, customersListDef, vendorsListDef } from "@/pagesContainer/company/postTransaction/postForm/modules/optionsArray";
import { chartOfAccountMain } from "@/assets/data/chartOfAccount/chartOfAccountsMain"; 
import { membersData, vendorsData } from "@/assets/data/membersData";
import getOptionsArray from "@/pagesContainer/company/postTransaction/postForm/modules/getOptionsArray";


//console.log(chartOfAccountMain);

const {creditorsLists, debtorsLists, creditorsList, debtorsList, crAcctOpts, drAcctOpts, subAccounts, customersListDef, vendorsListDef, defaultList} = getOptionsArray(chartOfAccountMain, vendorsData, membersData);
//console.log(customersListDef)

const useStorePostTransaction = create((set) => ({
     chartOfAccount:{main:drAcctOpts, vendors:creditorsLists, customers:debtorsLists},
     optionsArrayDefault:{ creditorsLists, debtorsLists, creditorsList, debtorsList, crAcctOpts, drAcctOpts, subAccounts, customersListDef, vendorsListDef, defaultList },

     tranSheet: [{...initRow}],
     singleBatchToggle:'BATCH',
     postMsg:{show:false, msg:''},
     drAccountOptsArr:[drAcctOpts],
     crAccountOptsArr:[crAcctOpts],
     drSubOptsArr:[customersListDef],     //[subAccounts],
     crSubOptsArr:[vendorsListDef],        //[subAccounts],
     sumValues: {debit:'0.00', credit:'0.00'},

     //SINGLE POSTING
     tranSheetSingle: [{...initRowSingle}, {...initRowSingle, debitCredit:'Debit'}],
     accountOptsArr:[drAcctOpts, crAcctOpts],
     subOptsArr:[customersListDef, customersListDef],     //[subAccounts],
     sumValuesSingle: {amount:'0.00'},
     postMsgSingle:{show:false, msg:''},


    dispatchTranSheet: (act) => set((state) => ({
        tranSheet: act,
    })),
    dispatchSingleBatchToggle: (act) => set((state) => ({
        singleBatchToggle: act,
    })),
    dispatchPostMsg: (act) => set((state) => ({
        postMsg: act,
    })),
    dispatchDrAccountOptsArr: (act) => set((state) => ({
        drAccountOptsArr: act,
    })),
    dispatchDrSubOptsArr: (act) => set((state) => ({
        drSubOptsArr: act,
    })),
    dispatchCrSubOptsArr: (act) => set((state) => ({
        crSubOptsArr: act,
    })),
    dispatchCrAccountOptsArr: (act) => set((state) => ({
        crAccountOptsArr: act,
    })),
    dispatchOptsArr: (act) => set((state) => ({ //Active?
        optsArr: act,
    })),
    dispatchAddOptsArr: (act) => set((state) => ({  //Active?
        optsArr: [...state.optsArr, ],
    })),
    dispatchSumValues: (act) => set((state) => ({
        sumValues: act,
    })),
    dispatchDefValues: (act) => set((state) => ({
        act
    })),
    dispatchClearTranSheet: (act) => set((state) => ({
        tranSheet: [{...initRow}],
        tranSheetSingle: [{...initRowSingle}, {...initRowSingle, debitCredit:'Debit'}],
    })),
    
    // SINGLE POSTING
    dispatchTranSheetSingle: (act) => set((state) => ({
        tranSheetSingle: act,
    })),
    dispatchAccountOptsArr: (act) => set((state) => ({
        accountOptsArr: act,
    })),
    dispatchSubOptsArr: (act) => set((state) => ({
        subOptsArr: act,
    })),
    dispatchSumValuesSingle: (act) => set((state) => ({
        sumValuesSingle: act,
    })),


    dispatchOptionsArrayUpdatePostTran: (act) => set((state) => ({
        chartOfAccount: act.chartOfAccount,
        drAccountOptsArr:act.drAccountOptsArr,
        crAccountOptsArr:act.crAccountOptsArr,
        drSubOptsArr:act.drSubOptsArr,     //[subAccounts],
        crSubOptsArr:act.crSubOptsArr,
        accountOptsArr:act.accountOptsArr,
        subOptsArr:act.subOptsArr, 
        optionsArrayDefault:act.optionsArrayValues,
    })),
}));



//export default useStorePostTransaction;