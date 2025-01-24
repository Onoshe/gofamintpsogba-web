import {create} from "zustand";
import getPastorCorner from "@/assets/data/pastorCornerLatest1";
import getPastorCornerMessages from "@/assets/data/pastorCorner";


const initialState = {
  pstCornerData:  getPastorCornerMessages(),
  pstCornerDataDispatched:false,
  selectedMsg:{},
  anchor:'',
  faithDeclaration:'',
  anchorBgImages:{imageBase:'', imageSub:''},
}

const usePstCornerMsgStore = create((set) => ({
  ...initialState,
  
    disPstCornerData:  (action) => set((state) => ({
      pstCornerData : action
       })),
    disSelectedMsg:  (action) => set((state) => ({
        selectedMsg : action
         })),
    disPstCornerDataDispatched:  (action) => set((state) => ({
      pstCornerDataDispatched : action
       })),
    disAnchor:  (action) => set((state) => ({
      anchor : action
       })),
    disFaithDeclaration:  (action) => set((state) => ({
      faithDeclaration : action
       })),
    disAnchorBgImages:  (action) => set((state) => ({
      anchorBgImages : action
       })),
}))



export default usePstCornerMsgStore;



function processPastorCornerMessages(msgArr){

  const allMsgsManualNew = msgArr.map((item,i)=>{
      
      return {...item, title:item.topic, body:item?.body?.split('\n\n'), msgID:item.messageID,
          likes:item.likes || [], comments: item?.comments || [], 
          details:{author: "Admin", date:item.date}}
  });
  
  const allMsgs = [...allMsgsManualNew];
  const sortedMsg = allMsgs.sort((a, b)=>b.sn - a.sn); //Descending Order
  
  return sortedMsg
}



export {processPastorCornerMessages}