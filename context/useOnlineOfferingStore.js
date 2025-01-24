import { createSlice } from '@reduxjs/toolkit';

const defStmt ={
    name:'',
    data:'',
    activities:[],
    activitiesShort:[],
    Total:'',
};



const initialState = {
  tableDatass:{tableHeaders:[], tableBodyKeys:[], tableBody:[]},
  seltdMemberStmt: defStmt,
}


export const onlineOfferingReducer = createSlice({
    name: 'onlineOffering',
    initialState,
    
    reducers: {
      disTableDatass: (state, action) => {
        state.tableDatass = action.payload
      },
      disSeltdMemberStmt: (state, action) => {
        state.seltdMemberStmt = action.payload
      },
    }
});



export const { disTableDatass, disSeltdMemberStmt,
 } = onlineOfferingReducer.actions
  
    
export default onlineOfferingReducer.reducer;


 

