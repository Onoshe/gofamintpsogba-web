import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
import {create} from "zustand";





const useStoreTransactions = create((set) => ({
    clientAccount:{companyName:''},
    coaStructure:[],
    chartOfAccounts:[],
    products:[{id:"", productName:"", productCode:"", category:"", description:''}],
    customers:[],
    vendors:[],
    transactions:[],
    transactionsDetails:[],
    controlAcctsCode:{}, //{retainedEarnings:321, receivables:142, payables:232, inventoryControl:152, inventoryAdj:153, costOfSale:511},
    transReady:false,
    clientsDataCall: 0,
    reportDate:{...getStartAndEndDate(), defaultDate:true},

    dispatchCOAStructure: (act) => set((state) => ({
        coaStructure: act.coaStructure,
        controlAcctsCode:act.controlAcctsCode
    })),
    dispatchProducts: (act) => set((state) => ({
        products: act,
    })),
    dispatchChartOfAccounts: (act) => set((state) => ({
        chartOfAccounts: act,
    })),
    dispatchCustomers: (act) => set((state) => ({
        customers: act,
    })),
    dispatchVendors: (act) => set((state) => ({
        vendors: act,
    })),
    dispatchTransReady: (act) => set((state) => ({
        transReady: act,
    })),
    dispatchTransactions: (act) => set((state) => ({
        transactions: act,
    })),
    dispatchTransactionsDetails: (act) => set((state) => ({
        transactionsDetails: act,
    })),
    runDispatchClientDataCall: (act) => set((state) => ({
        clientsDataCall: state.clientsDataCall + 1,
    })),
    dispatchClientAccount: (act) => set((state) => ({
        clientAccount: act,
    })),
    dispatchControlAcctCode: (act) => set((state) => ({
        controlAcctsCode: act,
    })),
    dispatchReportDate: (act) => set((state) => ({
        reportDate: act,
    })),

}));



export default useStoreTransactions;



/*
coaStructure:[...coaStructure],
    chartOfAccounts:[...getDefaultCOA()],
    products:[{id:"", productName:"", productCode:"", category:"--New Category--", description:''}, ...getDefaultProductList()],
    customers:[...getDefaultPersonalAcct('C-')],
    vendors:[...getDefaultPersonalAcct('V-')],
    controlAcctsCode:{retainedEarnings:321, receivables:142, payables:232, inventory:152},
    transReady:false,

*/