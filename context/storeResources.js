import {create} from "zustand";
import getHeaders from "@/pagesContainer/company/resources/headerTab/getHeaders";
import { coaStructureByName } from "@/admin/modules/chartOfAccountStructure";


const headerTab = getHeaders();
const headerTabsArr = Object.keys(headerTab);


const useStoreResources = create((set) => ({
    activeTab:headerTab.DOWNLOADMATERIALS,
    headerTab:headerTab,
    headerTabsArr:headerTabsArr,
    transactions:[], //Original unprocessed transSheet uploaded. Dispatched from ZEffect in layoutCointainer
    transEntries:{},  //Processed uploaded transSheet. Dispatched from ZEffect in layoutCointainer
    allAccountCodes:{},
    coaStructureByName:coaStructureByName,

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

}));



export default useStoreResources;