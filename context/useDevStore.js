import {create} from "zustand";

const initialState = {
  fetchedPrograms:{},
  fetchedControls:{},
  showAllTableFlds:false,
  memberTableViewAll:false,
  adminUser:true,
}


const useDevStore = create((set) => ({
  ...initialState,
    
      disFectedPrograms:(action) => set((state) => ({
        fetchedPrograms :  action
      })),
      disFectedControls:(action) => set((state) => ({
        fetchedControls :  action
      })),
      disShowAllTableFlds:(action) => set((state) => ({
        showAllTableFlds :  action
      })),
      disMemberTableViewAll:(action) => set((state) => ({
        memberTableViewAll :  action
      })),
      disAdminUser:(action) => set((state) => ({
        adminUser :  action
      })),
}));



    
export default useDevStore
