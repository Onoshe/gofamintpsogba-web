import {create} from "zustand";


const initialState = {
  showSidebar:true,
  seltdTab: [0,0,{name:'Home',title:'RECORDABOUTHOME'}], //[parentTabIndex, selfIndex, {name:'Home',title:'RECORDABOUTHOME'}],
  formDataPosted:[{}],
  formDataState:{submitted:false, },
  snackbar:{bColor:'red', msg:'Show Snackbar', duration:3000, show:false},
  tableData:{display: [], report:[],},
  allData:[],
  freshRegistration:{start:false},
  celebrantsData:{birthday:[], wedAnns:[]},
  celebrants:{birthday:{month:[], today:[]}, wedAnns:{month:[], today:[]},},
  celebBirthday:{month:[], today:[]}, 
  celebWedAnns: {month:[], today:[]},
  updateRecord:{startUpdate:false,user:'', recordToUpdateCount:0, recordToUpdate:[]},
  confirmIndv:{clicked:false},
  userRecords:[],
}

const useUserStore = create((set) => ({
  ...initialState,

    disShowSidebar: (action) => set((state) => ({
      showSidebar: action
    })),
    disSeltdTab: (action) => set((state) => ({
      seltdTab : action
    })),
    disFormDataPosted: (action) => set((state) => ({
      formDataPosted : action
    })),
    disFormDataState: (action) => set((state) => ({
      formDataState : action
    })),
    disSnackbar: (action) => set((state) => ({
      snackbar : action
      })),
    disShowSnackbar: (action) => set((state) => ({
      snackbar : {...state.snackbar, show:action.payload}
      })),
    disTableData: (action) => set((state) => ({
      tableData : action
      })),
    disUpdateRecord: (action) => set((state) => ({
      updateRecord : action
      })),
    disFreshRegistration: (action) => set((state) => ({
      freshRegistration : action
      })),
    disConfirmIndv: (action) => set((state) => ({
      confirmIndv : action
      })),
    disAllData: (action) => set((state) => ({
      allData : action
      })),
    disCelebrantsData: (action) => set((state) => ({
      celebrantsData : action
      })),
    disCelebrants: (action) => set((state) => ({
      celebrants : action
      })),
    disCelebrantsBirthday: (action) => set((state) => ({
      celebBirthday : action
      })),
    disCelebrantsWedAnns: (action) => set((state) => ({
      celebWedAnns : action
      })),
    disResetUserState:(action) => set((state) => ({
      formDataPosted: [{}],
      formDataState: {submitted:false, },
      tableData:{display: [], report:[],},
      allData:[],
      freshRegistration:{start:false},
      updateRecord:{startUpdate:false,user:'', recordToUpdateCount:0, recordToUpdate:[]},
      userRecords:[]
    })),
}))


export default useUserStore