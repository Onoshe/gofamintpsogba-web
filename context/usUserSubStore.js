import {create} from "zustand";


const initialState = {
  userRecords:[],
  accessdeniedList:[],
  accesspermitList:[],
  userFetchedData:[],
  userFetchedDataOthers:[],
  membersStat:[],
  pdfReportData:[],
  userRecordsOthers:[],
  userSearchedRecords:[],
  currentStep:{step:0, about:'', details:''},
  saveMyRecords:false,
  myInbox:[],
  myInboxObj:{},
}

const useUserSubStore = create((set) => ({
  ...initialState,
  
    disUserRecords: (action) => set((state) => ({
      userRecords : action
      })),
    disUserRecordsOthers: (action) => set((state) => ({
      userRecordsOthers : action
      })),
    disUserSearchedRecords: (action) => set((state) => ({
      userSearchedRecords : action
      })),
    disAccessdeniedList: (action) => set((state) => ({
        accessdeniedList : action
     })),
    disAccesspermitList: (action) => set((state) => ({
      accesspermitList : action
   })),
   disUserFetchedData: (action) => set((state) => ({
    userFetchedData : action
  })),
  disUserFetchedDataOthers: (action) => set((state) => ({
    userFetchedDataOthers : action
    })),
    disMemberStat: (action) => set((state) => ({
      membersStat : action
    })),
    disPdfReportData: (action) => set((state) => ({
      pdfReportData : action
    })),
    disCurrentStep: (action) => set((state) => ({
      currentStep : action
    })),
    disSaveMyRecords: (action) => set((state) => ({
      saveMyRecords : action
    })),
    disMyInbox: (action) => set((state) => ({
      myInbox : action
    })),
    disMyInboxObj: (action) => set((state) => ({
      myInboxObj : action
    })),
    disLogoutUserSubReset: (action) => set((state) => ({
      userRecords: [],
      accessdeniedList: [],
      accesspermitList: [],
      userFetchedData: [],
      userFetchedDataOthers: [],
      membersStat: [],
      pdfReportData: [],
      userRecordsOthers: [],
      userSearchedRecords: [],
      myInbox: [],
      myInboxObj: {},
    })),
}))


  
export default useUserSubStore