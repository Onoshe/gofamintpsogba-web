import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  persist:{start:false,},
}

export const persistReducer = createSlice({
  name: 'persist',
  initialState,
  
  reducers: {
    disPersist: (state, action) => {
      state.persist = action.payload
    },
  },
})


export const { disPersist } = persistReducer.actions

export default persistReducer.reducer