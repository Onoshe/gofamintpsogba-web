'use client'
import usePstCornerMsgStore from "@/context/usePstCornerMsgStore";
import PastorCornerIndex from "./main/_Index"
import { useAuthCustom } from "@/lib/authActions/useAuthCustom";



export default function PastorCorner({pastorCornerPhotos}) {
  const {pstCornerData} = usePstCornerMsgStore((state)=>state);

  return (
    <PastorCornerIndex pstCornerData={pstCornerData}
    pastorCornerPhotos={pastorCornerPhotos}/>
  )
}
