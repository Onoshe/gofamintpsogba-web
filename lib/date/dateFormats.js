
function dateFmtISO(date){
   let d= new Date();
   if(date){
    d = new Date(date);
   }
   return d.toISOString();  
}


export {dateFmtISO}