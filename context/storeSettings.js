import {create} from "zustand";
import getHeaders from "@/pagesContainer/company/settings/headerTab/getHeaders";


const headerTab = getHeaders();
const headerTabsArr = Object.keys(headerTab);

const useStoreSettings = create((set) => ({
    activeTab:headerTab.HOME,
    headerTab:headerTab,
    headerTabsArr:headerTabsArr,
    
    
    dispatchActiveTab: (act) => set((state) => ({
        activeTab: act,
    })),
    
    
}));



export default useStoreSettings;