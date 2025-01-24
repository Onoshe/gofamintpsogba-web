import {create} from "zustand";



const initialState = {
  photos:[],
  fiveStarPhotos:[],
  homeImg:"",
}

const usePhotoGalleriesStore = create((set) => ({
  ...initialState,
    disPhotos:(action) => set((state) => ({
      photos: action
    })),
}))


  
export default usePhotoGalleriesStore