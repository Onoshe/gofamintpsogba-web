import {create} from "zustand";
import getHeaders from "@/container/reports/components/headerTab/getHeaders";
//import { coaStructureByName } from "@/admin/modules/chartOfAccountStructure";



const headerTab = getHeaders();
const headerTabsArr = Object.keys(headerTab);

const useStoreReports = create((set) => ({
    activeTab:headerTab.TRIALBALANCE,
    headerTab:headerTab,
    headerTabsArr:headerTabsArr,
    transactions:[],
    transEntries:{}, 
    allAccountCodes:{},
    selTab:{open:false, idx:0, report:{}},
    currentReport: {name:'general-ledger', title:'General Ledger', mainReport:'GL'}, //{name:'trial-balance', title:'Trial Balance', mainReport:'TB'}
    selectedTranFromList:{},
    //coaStructureByName:coaStructureByName,

    trialBalance:{},
    genLedgerMain:{},
    customersAccounts:{genLedgerCustomers:{}, customersLedgerArr:[]},
    vendorsAccounts:{genLedgerVendors:{}, vendorsLedgerArr:[]},

    allAccountCodesInitDb:{},
    //Query
    queryDoc:"TRAN-DATE",

    dispatchActiveTab: (act) => set((state) => ({
        activeTab: act,
    })),
    dispatchTransEntries: (act) => set((state) => ({
        transEntries: act,
    })),
    dispatchTransactions: (act) => set((state) => ({
        transactions: act,
    })),
    dispatchAllAccountCodes: (act) => set((state) => ({
        allAccountCodes: act,
    })),

    dispatchTrialBalanceInit: (act) => set((state) => ({
        trialBalance: act,
    })),
    dispatchGenLedgerMain: (act) => set((state) => ({
        genLedgerMain: act,
    })),
    dispatchCustomersAccounts: (act) => set((state) => ({
        customersAccounts: act,
    })),
    dispatchVendorsAccounts: (act) => set((state) => ({
        vendorsAccounts: act,
    })),

    dispatchQueryDoc: (act) => set((state) => ({
        queryDoc: act,
    })),
    dispatchAllAccountCodesInitDb: (act) => set((state) => ({
        allAccountCodesInitDb: act,
    })),
    dispatchSelTab: (act) => set((state) => ({
        selTab: act,
    })),
    dispatchCurrentReport: (act) => set((state) => ({
        currentReport: act,
    })),
    dispatchSelectedTranFromList: (act) => set((state) => ({
        selectedTranFromList: act,
    })),
}));



export default useStoreReports;