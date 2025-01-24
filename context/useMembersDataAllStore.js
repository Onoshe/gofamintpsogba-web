import { createSlice } from '@reduxjs/toolkit';
import { filterData } from '../../utils/filterData';


const initialState = {
  membersDataAll:[],
  filesOperation: {show:false, msg:"", type:''},
  filteredData:'Members',
  filteredDataObj:{name: 'Filter none', fld:0, val:0, familySort:true},
}

export const membersDataAllReducer = createSlice({
  name: 'membersDataAll',
  initialState,
  
  reducers: {
    disMembersDataAll: (state, action) => {
      state.membersDataAll = action.payload
    },
    disFilesOperation: (state, action) => {
      state.filesOperation = action.payload
    },
    disFilteredData: (state, action) => {
      state.filteredData = action.payload
    },
    disFilteredDataObj: (state, action) => {
      state.filteredDataObj = action.payload
    },

  },
})


export const { disMembersDataAll, disFilesOperation, disFilteredData,
  disFilteredDataObj } = membersDataAllReducer.actions

  
export default membersDataAllReducer.reducer