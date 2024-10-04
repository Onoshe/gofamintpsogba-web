import { capitalizeFirstChar } from "@/lib/capitalize/capitalizeString"




export const tableHeaderFormater = (keys)=>{
   
   return keys?.map((key)=>{
       let fmtStr = key.split(/(?=[A-Z])/);
       if(fmtStr?.length){
        fmtStr[0] = capitalizeFirstChar(fmtStr[0]);
       }
       fmtStr = fmtStr.join(" ");
       return fmtStr
    })
} 