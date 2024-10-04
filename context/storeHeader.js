import {create} from "zustand";



const useStoreHeader = create((set) => ({
    activePage:{name:'', title:"Dashboard"},
    coy:'',  //coy:'coy',
    isOpen:false, //Side drawer
    pageLoading:false,
    showSidebarTitle:true,
    showNotificationBar:true,
    settings:[],
    subscriptions:[],
    refreshSettingsCount:0,
    activityLog:[],
    users:[],
    user: {firstname:'', lastname:'', gender:'', email:'', role:'', phoneNo:'',userName:'', nonActive:'0', deleted:'0'},
    fetchSettingsCall:0,
    generalSettings:[],
    client_Admin:{},
    clientData:{},
    quickrecordsLogo:"http://localhost/quickrecords_backend/asset/quickrecords-logo.jpg",

    dispatchUsers: (act) => set((state) => ({
        users: act,
    })),
    dispatchUser: (act) => set((state) => ({
        user: act,
    })),

    dispatchActivePage: (act) => set((state) => ({
        activePage: act,
    })),
    dispatchCoy: (act) => set((state) => ({
        coy: act,
    })),
    dispatchIsOpen: (act) => set((state) => ({
        isOpen: act,
    })),
    dispatchPageLoading: (act) => set((state) => ({
        pageLoading: act,
    })),
    dispatchShowSidebarTitle: (act) => set((state) => ({
        showSidebarTitle: act,
    })),
    dispatchShowNotificationBar: (act) => set((state) => ({
        showNotificationBar: act,
    })),
    dispatchSettings: (act) => set((state) => ({
        settings: act,
    })),
    dispatchRefreshSettingsCount: (act) => set((state) => ({
        refreshSettingsCount: state.refreshSettingsCount +=1,
    })),
    dispatchSubscriptions: (act) => set((state) => ({
        subscriptions: act,
    })),
    dispatchActivityLog: (act) => set((state) => ({
        activityLog: act,
    })),
    dispatchFetchSettingsCall: (act) => set((state) => ({
        fetchSettingsCall: state.fetchSettingsCall + 1,
    })),
    dispatchGeneralSettings: (act) => set((state) => ({
        generalSettings: act,
    })),
    dispatchClientAdmin: (act) => set((state) => ({
        client_Admin: act,
    })),
    dispatchClientData: (act) => set((state) => ({
        clientData: act,
    })),
   
}));



export default useStoreHeader;