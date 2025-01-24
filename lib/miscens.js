

function getBiblePsg(strg){
   const lstIndexOfBracket = strg.lastIndexOf("(");
   //const psg =  "(" + strg.split('(')[1];
    const psg = strg?.slice(lstIndexOfBracket);

    return psg
}

const getPstCornBodyMsg=(arr, len)=>{
   if(!arr?.length) return [];
   
    const ln1 = arr[0] || "";
    const ln2 = arr[1] || "";
    const ln3 = arr[2] || "";
    const lns = `${ln1}|${ln2}|${ln3}`;
    const abLn= lns?.substring(0, len)?.split(/\r?\n/)+'..."';
    const returnVal = abLn.split('|');
    return returnVal
}

function getTodayMonth(){
  const d = new Date();
  let mnth = months[d.getMonth()];
  
  return [parseInt(d.getMonth())+1, mnth]
}

function getTodayDate(){
  const d = new Date();
  let todayDay = d.getDate();
  
  return [todayDay]
}

function getTodayDateStr(){
  const d = new Date();
  let todayDay = d.getDate();
  todayDay = todayDay < 10? '0'+todayDay : todayDay;
  
  return [todayDay]
}


export {getBiblePsg, getTodayMonth, getTodayDate, getTodayDateStr, getPstCornBodyMsg}




const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];