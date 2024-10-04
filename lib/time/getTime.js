
export function getExpirationTime(mins, inTime){
    if(!mins) return 0;
    const currntTime = new Date().getTime();
    const addMins = mins * 60000;
    const newTime = currntTime + addMins;
    return inTime? new Date(newTime).toISOString() : newTime;
 }


 
