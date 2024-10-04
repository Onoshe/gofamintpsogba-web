import {create} from "zustand";
import { initRow, initRowSingle } from "@/pagesContainer/company/postTransaction/postForm/modules/handleAddRemoveRow";
//import { drAcctOpts, crAcctOpts, customersListDef } from "@/pagesContainer/company/postTransaction/postForm/modules/optionsArray";
import getOptionsArray from "@/pagesContainer/company/postTransaction/postForm/modules/getOptionsArray";
import { chartOfAccountMain } from "@/assets/data/chartOfAccount/chartOfAccountsMain"; 
import { membersData, vendorsData } from "@/assets/data/membersData";


const {drAcctOpts, crAcctOpts, customersListDef} = getOptionsArray(chartOfAccountMain, vendorsData, membersData);


const useStorePostJournal = create((set) => ({
     tranSheetJournal: [{...initRowSingle}, {...initRowSingle, debitCredit:'Debit'}],
     tranSheetJournalInitVals:[{...initRowSingle}, {...initRowSingle, debitCredit:'Debit'}],
     accountOptsArrJournal:[drAcctOpts, crAcctOpts],
     subOptsArrJournal:[customersListDef, customersListDef],     //[subAccounts],
     sumValuesJournal: {amount:'0.00'},
     postMsgJournal:{show:false, msg:''},


    dispatchTranSheetJournal: (act) => set((state) => ({
        tranSheetJournal: act,
    })),
    dispatchAccountOptsArrJournal: (act) => set((state) => ({
        accountOptsArrJournal: act,
    })),
    dispatchSubOptsArrJournal: (act) => set((state) => ({
        subOptsArrJournal: act,
    })),
    dispatchSumValuesJournal: (act) => set((state) => ({
        sumValuesJournal: act,
    })),
    dispatchPostMsgJournal: (act) => set((state) => ({
        postMsgJournal: act,
    })),

    dispatchOptionsArrayUpdateJournal: (act) => set((state) => ({
        accountOptsArrJournal: act.accountOptsArrJournal,
        subOptsArrJournal:act.subOptsArrJournal
    })),

    dispatchClearJournalSheet: (act) => set((state) => ({
        tranSheetJournal: [{...initRowSingle}, {...initRowSingle, debitCredit:'Debit'}],
        tranSheetJournalInitVals:[{...initRowSingle}, {...initRowSingle, debitCredit:'Debit'}],
    })),
}));



export default useStorePostJournal;