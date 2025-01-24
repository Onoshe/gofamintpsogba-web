import {create} from "zustand";

const initialState = {
  imgGroup:{}
}


const useStoreHeader = create((set) => ({
  ...initialState,
    
      dispatchImgGroup:(action) => set((state) => ({
        imgGroup :  action
      })),
}));



    
export default useStoreHeader
